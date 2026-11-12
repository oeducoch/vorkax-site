#!/usr/bin/env python3
"""
Verax - build do arquivo unico self-contained.

Le index.html + css/styles.css + js/app.js + assets/img/* e gera
dist/verax-plataforma.html com CSS e JS embutidos e as imagens em base64.
Esse arquivo abre sozinho em qualquer navegador e serve para publicar
como Artifact do Claude.

Uso:
    python3 build.py
"""
import base64, os, re, sys

ROOT = os.path.dirname(os.path.abspath(__file__))

def read(*p):
    with open(os.path.join(ROOT, *p), encoding="utf-8") as f:
        return f.read()

def data_uri(path):
    ext = os.path.splitext(path)[1].lower().lstrip(".")
    mime = {"jpg": "jpeg", "jpeg": "jpeg", "png": "png", "webp": "webp", "svg": "svg+xml"}.get(ext, ext)
    with open(os.path.join(ROOT, path), "rb") as f:
        return "data:image/%s;base64,%s" % (mime, base64.b64encode(f.read()).decode())

def main():
    html = read("index.html")
    css = read("css", "styles.css")
    js = read("js", "app.js")
    if "</script>" in js:
        sys.exit("ERRO: js/app.js contem '</script>', o inline quebraria.")

    # inline CSS
    html = html.replace('<link rel="stylesheet" href="css/styles.css">',
                        "<style>\n" + css + "\n</style>")
    # inline JS
    html = html.replace('<script src="js/app.js"></script>',
                        "<script>\n" + js + "\n</script>")
    # imagens -> data URI (qualquer src="assets/img/....")
    for m in sorted(set(re.findall(r"assets/img/[\w.\-]+", html))):
        if os.path.exists(os.path.join(ROOT, m)):
            html = html.replace(m, data_uri(m))

    os.makedirs(os.path.join(ROOT, "dist"), exist_ok=True)
    out = os.path.join(ROOT, "dist", "verax-plataforma.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print("OK -> dist/verax-plataforma.html  (%.2f MB)" % (len(html) / 1048576))

if __name__ == "__main__":
    main()
