#!/usr/bin/env python3
"""
Atualiza os dados da página Mercado (pages/mercado.html). Python puro, sem dependências.

Fontes (todas com uso comercial permitido ou manchete com link para a origem):
  - CONAB, preços agropecuários semanais por UF (dados abertos do governo federal).
    Ao produtor e no atacado, em R$/kg. A CONAB publica cerca de 12 meses; este script
    guarda cada semana nova nos arquivos JSON, então a série histórica cresce sozinha.
  - Canal Rural, manchetes via RSS público (título, data e link para a matéria original).

Saídas em data/mercado/:
  catalogo.json         lista de ativos com último valor, variação e minigráfico
  series/<id>.json      série completa por UF (BR = média simples das UFs informadas)
  noticias.json         últimas manchetes

Uso:
  python3 scripts/mercado/atualizar.py              # notícias sempre; CONAB se passou de 6 h
  python3 scripts/mercado/atualizar.py --forcar     # baixa a CONAB mesmo assim
  python3 scripts/mercado/atualizar.py --selftest
"""
import json
import os
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SAIDA = os.path.join(RAIZ, "data", "mercado")
SERIES = os.path.join(SAIDA, "series")
CONAB_URL = "https://portaldeinformacoes.conab.gov.br/downloads/arquivos/PrecosSemanalUF.txt"
RSS = [("Canal Rural", "https://www.canalrural.com.br/feed/")]
UA = {"User-Agent": "Mozilla/5.0 (compatible; VorkaxMercado/1.0; +https://vorkax.plexiweb.app)"}
CONAB_INTERVALO = timedelta(hours=6)  # a CONAB publica 1 vez por semana; não precisa baixar 14 MB a cada 15 min

# produto CONAB -> (nome na tela, grupo). Só entram os itens desta lista.
PRODUTOS = {
    "ALHO": ("Alho", "Hortaliças"), "CEBOLA": ("Cebola", "Hortaliças"), "BATATA": ("Batata", "Hortaliças"),
    "TOMATE": ("Tomate", "Hortaliças"), "RAIZ DE MANDIOCA": ("Mandioca", "Hortaliças"),
    "BOI": ("Boi gordo", "Pecuária"), "SUINO": ("Suíno", "Pecuária"), "LEITE DE VACA": ("Leite", "Pecuária"),
    "MILHO": ("Milho", "Grãos"), "SOJA": ("Soja", "Grãos"), "FEIJAO": ("Feijão", "Grãos"),
    "ARROZ": ("Arroz", "Grãos"), "TRIGO": ("Trigo", "Grãos"), "SORGO GRANIFERO": ("Sorgo", "Grãos"),
    "CAFE": ("Café", "Café e fibras"), "ALGODAO EM PLUMA": ("Algodão em pluma", "Café e fibras"),
    "LARANJA": ("Laranja", "Frutas"), "BANANA": ("Banana", "Frutas"),
}
NIVEIS = {"PREÇO RECEBIDO P/ PR": ("produtor", "Produtor"), "ATACADO": ("atacado", "Atacado")}
MIN_SEMANAS = 6  # ativo com menos semanas que isso não entra no catálogo


def baixar(url, timeout=60):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout) as r:
        return r.read()


def slug(txt):
    txt = txt.lower()
    for a, b in (("áàâã", "a"), ("éê", "e"), ("í", "i"), ("óôõ", "o"), ("ú", "u"), ("ç", "c")):
        for ch in a:
            txt = txt.replace(ch, b)
    return re.sub(r"[^a-z0-9]+", "-", txt).strip("-")


def parse_conab(texto):
    """Devolve {(produto, classificação, nível): {uf: {data_iso: valor}}} só dos itens de interesse."""
    out = {}
    linhas = texto.splitlines()
    cab = [c.strip() for c in linhas[0].split(";")]
    i = {nome: cab.index(nome) for nome in ("produto", "classificao_produto", "uf", "data_inicial_final_semana",
                                            "dsc_nivel_comercializacao", "valor_produto_kg")}
    for ln in linhas[1:]:
        c = [x.strip() for x in ln.split(";")]
        if len(c) < len(cab):
            continue
        prod, nivel = c[i["produto"]], c[i["dsc_nivel_comercializacao"]]
        if prod not in PRODUTOS or nivel not in NIVEIS:
            continue
        m = re.search(r"(\d{2})-(\d{2})-(\d{4})\s*$", c[i["data_inicial_final_semana"]])
        try:
            valor = float(c[i["valor_produto_kg"]].replace(".", "").replace(",", "."))
        except ValueError:
            continue
        if not m or valor <= 0:
            continue
        data = f"{m.group(3)}-{m.group(2)}-{m.group(1)}"
        chave = (prod, c[i["classificao_produto"]] or "-", nivel)
        out.setdefault(chave, {}).setdefault(c[i["uf"]], {})[data] = round(valor, 2)
    return out


def ler_json(caminho, padrao):
    try:
        with open(caminho, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return padrao


def gravar_json(caminho, dados):
    os.makedirs(os.path.dirname(caminho), exist_ok=True)
    with open(caminho, "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False, separators=(",", ":"))
        f.write("\n")


def media_br(ufs):
    """Média simples das UFs que informaram preço em cada semana."""
    por_data = {}
    for uf, pts in ufs.items():
        if uf == "BR":
            continue
        for d, v in pts:
            por_data.setdefault(d, []).append(v)
    return [[d, round(sum(v) / len(v), 2)] for d, v in sorted(por_data.items())]


def atualizar_conab(agora):
    texto = baixar(CONAB_URL, timeout=180).decode("latin-1")
    dados = parse_conab(texto)
    catalogo = []
    for (prod, classif, nivel), ufs_novas in sorted(dados.items()):
        nome, grupo = PRODUTOS[prod]
        nivel_id, nivel_nome = NIVEIS[nivel]
        classif_nome = "" if classif in ("-", "NÃO INFORMADO", "COMUM") or classif.lower() in nome.lower() else classif.title()
        sid = slug(f"{nome}-{classif_nome}-{nivel_id}")
        caminho = os.path.join(SERIES, f"{sid}.json")
        antigo = ler_json(caminho, {}).get("ufs", {})
        ufs = {}
        for uf in set(antigo) | set(ufs_novas):  # junta o que já estava guardado com o que veio agora
            if uf == "BR":
                continue
            pts = {d: v for d, v in antigo.get(uf, [])}
            pts.update(ufs_novas.get(uf, {}))
            ufs[uf] = [[d, pts[d]] for d in sorted(pts)]
        ufs["BR"] = media_br(ufs)
        if len(ufs["BR"]) < MIN_SEMANAS:
            continue
        titulo = nome + (f" {classif_nome}" if classif_nome else "")
        serie = {"id": sid, "nome": titulo, "grupo": grupo, "nivel": nivel_nome, "unidade": "R$/kg",
                 "frequencia": "semanal", "fonte": "CONAB, preços agropecuários semanais",
                 "nota": "BR = média simples das UFs que informaram preço na semana.", "ufs": ufs}
        gravar_json(caminho, serie)
        br = ufs["BR"]
        ult, ant = br[-1], br[-2]
        catalogo.append({"id": sid, "nome": titulo, "grupo": grupo, "nivel": nivel_nome, "unidade": "R$/kg",
                         "data": ult[0], "valor": ult[1], "anterior": ant[1],
                         "variacao": round((ult[1] / ant[1] - 1) * 100, 2) if ant[1] else 0,
                         "ufs": sorted(u for u in ufs if u != "BR"), "spark": [v for _, v in br[-26:]]})
    # tira do catálogo o que a CONAB parou de informar (arquivo fica guardado, com o histórico)
    mais_recente = max((a["data"] for a in catalogo), default="")
    if mais_recente:
        corte = (datetime.fromisoformat(mais_recente) - timedelta(weeks=8)).date().isoformat()
        catalogo = [a for a in catalogo if a["data"] >= corte]
    ordem = list(dict.fromkeys(g for _, g in PRODUTOS.values()))
    catalogo.sort(key=lambda a: (ordem.index(a["grupo"]), a["nome"], a["nivel"]))
    return catalogo


def limpar_html(txt):
    txt = re.sub(r"<[^>]+>", "", txt or "")
    return re.sub(r"\s+", " ", txt.replace("&nbsp;", " ")).strip()


def parse_rss(xml_bytes, fonte):
    itens = []
    raiz = ET.fromstring(xml_bytes)
    for it in raiz.iter("item"):
        titulo = limpar_html(it.findtext("title"))
        link = (it.findtext("link") or "").strip()
        if not titulo or not link.startswith("http"):
            continue
        data = ""
        try:
            data = parsedate_to_datetime(it.findtext("pubDate")).astimezone(timezone.utc).isoformat(timespec="minutes")
        except (TypeError, ValueError):
            pass
        cats = [limpar_html(c.text) for c in it.findall("category") if c.text]
        itens.append({"fonte": fonte, "titulo": titulo, "link": link, "data": data,
                      "tema": cats[0] if cats else "Agro"})
    return itens


def atualizar_noticias(agora):
    itens, erros = [], []
    for fonte, url in RSS:
        try:
            itens += parse_rss(baixar(url), fonte)
        except Exception as e:  # uma fonte fora do ar não derruba as outras
            erros.append(f"{fonte}: {str(e)[:80]}")
    vistos, unicos = set(), []
    for it in sorted(itens, key=lambda x: x["data"], reverse=True):
        k = it["titulo"].lower()[:70]
        if k not in vistos:
            vistos.add(k)
            unicos.append(it)
    return unicos[:40], erros


def main(argv):
    if "--selftest" in argv:
        return selftest()
    agora = datetime.now(timezone.utc)
    os.makedirs(SERIES, exist_ok=True)
    cat_path = os.path.join(SAIDA, "catalogo.json")
    cat = ler_json(cat_path, {})
    ultima = cat.get("conab_baixado_em")
    precisa = "--forcar" in argv or not ultima or agora - datetime.fromisoformat(ultima) > CONAB_INTERVALO
    if precisa:
        try:
            ativos = atualizar_conab(agora)
            cat = {"atualizado": agora.isoformat(timespec="minutes"), "conab_baixado_em": agora.isoformat(timespec="minutes"),
                   "fonte": "CONAB, preços agropecuários semanais por UF (dados abertos)", "ativos": ativos}
            gravar_json(cat_path, cat)
            print(f"CONAB: {len(ativos)} ativos")
        except Exception as e:
            print(f"CONAB erro (mantidos os dados anteriores): {str(e)[:120]}")
    else:
        print("CONAB: baixada há menos de 6 h, pulando")
    noticias, erros = atualizar_noticias(agora)
    if noticias:
        gravar_json(os.path.join(SAIDA, "noticias.json"),
                    {"atualizado": agora.isoformat(timespec="minutes"), "itens": noticias, "erros": erros})
    print(f"Notícias: {len(noticias)} manchetes", ("| erros: " + "; ".join(erros)) if erros else "")
    return 0


def selftest():
    amostra = ("produto;classificao_produto;id_produto;uf;regiao;ano;mes;data_inicial_final_semana;semana;"
               "dsc_nivel_comercializacao;valor_produto_kg\n"
               "ALHO                     ;COMUM               ;5361;GO        ;CENTRO-OESTE ;2026;11;02-11-2026 - 06-11-2026  ;1;PREÇO RECEBIDO P/ PR;12,5\n"
               "ALHO                     ;COMUM               ;5361;BA        ;NORDESTE     ;2026;11;02-11-2026 - 06-11-2026  ;1;PREÇO RECEBIDO P/ PR;14,5\n"
               "TRATOR                   ;X                   ;1;GO        ;CENTRO-OESTE ;2026;11;02-11-2026 - 06-11-2026  ;1;ATACADO;9,0\n"
               "ALHO                     ;COMUM               ;5361;GO        ;CENTRO-OESTE ;2026;11;02-11-2026 - 06-11-2026  ;1;VAREJO;30,0\n")
    p = parse_conab(amostra)
    assert p == {("ALHO", "COMUM", "PREÇO RECEBIDO P/ PR"): {"GO": {"2026-11-06": 12.5}, "BA": {"2026-11-06": 14.5}}}, p
    assert media_br({"GO": [["2026-11-06", 12.5]], "BA": [["2026-11-06", 14.5]]}) == [["2026-11-06", 13.5]]
    assert slug("Feijão Carioca-produtor") == "feijao-carioca-produtor"
    rss = (b'<?xml version="1.0"?><rss><channel><item><title>Soja sobe &amp; milho cai</title>'
           b'<link>https://x.com/a</link><pubDate>Fri, 14 Nov 2026 12:00:00 -0300</pubDate>'
           b'<category>Mercado</category></item><item><title></title><link>https://x</link></item></channel></rss>')
    r = parse_rss(rss, "Teste")
    assert r == [{"fonte": "Teste", "titulo": "Soja sobe & milho cai", "link": "https://x.com/a",
                  "data": "2026-11-14T15:00+00:00", "tema": "Mercado"}], r
    print("selftest OK")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
