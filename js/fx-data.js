// Vorkax: dados do câmbio. Script clássico (funciona também abrindo o arquivo direto, sem servidor).
// countries: 70 maiores economias por PIB nominal (estimativa FMI 2024, aproximada), sem o Brasil,
//            que é a origem do envio. Formato: [nome em português, ISO2, moeda local].
// currencies: 20 moedas mais negociadas (BIS 2022) sem o real, com o dirham (AED) no lugar do real.
//             Formato: [código, nome, ISO2 da bandeira].
globalThis.VorkaxFXData = {
  countries: [
    ['África do Sul', 'ZA', 'ZAR'], ['Alemanha', 'DE', 'EUR'], ['Angola', 'AO', 'AOA'],
    ['Arábia Saudita', 'SA', 'SAR'], ['Argélia', 'DZ', 'DZD'], ['Argentina', 'AR', 'ARS'],
    ['Austrália', 'AU', 'AUD'], ['Áustria', 'AT', 'EUR'], ['Bangladesh', 'BD', 'BDT'],
    ['Bélgica', 'BE', 'EUR'], ['Bulgária', 'BG', 'EUR'], ['Canadá', 'CA', 'CAD'],
    ['Catar', 'QA', 'QAR'], ['Cazaquistão', 'KZ', 'KZT'], ['Chile', 'CL', 'CLP'],
    ['China', 'CN', 'CNY'], ['Colômbia', 'CO', 'COP'], ['Coreia do Sul', 'KR', 'KRW'],
    ['Dinamarca', 'DK', 'DKK'], ['Egito', 'EG', 'EGP'], ['Emirados Árabes Unidos', 'AE', 'AED'],
    ['Equador', 'EC', 'USD'], ['Eslováquia', 'SK', 'EUR'], ['Espanha', 'ES', 'EUR'],
    ['Estados Unidos', 'US', 'USD'], ['Etiópia', 'ET', 'ETB'], ['Filipinas', 'PH', 'PHP'],
    ['Finlândia', 'FI', 'EUR'], ['França', 'FR', 'EUR'], ['Grécia', 'GR', 'EUR'],
    ['Guatemala', 'GT', 'GTQ'], ['Hong Kong', 'HK', 'HKD'], ['Hungria', 'HU', 'HUF'],
    ['Índia', 'IN', 'INR'], ['Indonésia', 'ID', 'IDR'], ['Irã', 'IR', 'IRR'],
    ['Iraque', 'IQ', 'IQD'], ['Irlanda', 'IE', 'EUR'], ['Israel', 'IL', 'ILS'],
    ['Itália', 'IT', 'EUR'], ['Japão', 'JP', 'JPY'], ['Kuwait', 'KW', 'KWD'],
    ['Luxemburgo', 'LU', 'EUR'], ['Malásia', 'MY', 'MYR'], ['Marrocos', 'MA', 'MAD'],
    ['México', 'MX', 'MXN'], ['Nigéria', 'NG', 'NGN'], ['Noruega', 'NO', 'NOK'],
    ['Nova Zelândia', 'NZ', 'NZD'], ['Omã', 'OM', 'OMR'], ['Países Baixos', 'NL', 'EUR'],
    ['Paquistão', 'PK', 'PKR'], ['Peru', 'PE', 'PEN'], ['Polônia', 'PL', 'PLN'],
    ['Portugal', 'PT', 'EUR'], ['Quênia', 'KE', 'KES'], ['Reino Unido', 'GB', 'GBP'],
    ['República Dominicana', 'DO', 'DOP'], ['República Tcheca', 'CZ', 'CZK'], ['Romênia', 'RO', 'RON'],
    ['Rússia', 'RU', 'RUB'], ['Singapura', 'SG', 'SGD'], ['Suécia', 'SE', 'SEK'],
    ['Suíça', 'CH', 'CHF'], ['Tailândia', 'TH', 'THB'], ['Taiwan', 'TW', 'TWD'],
    ['Turquia', 'TR', 'TRY'], ['Ucrânia', 'UA', 'UAH'], ['Uzbequistão', 'UZ', 'UZS'],
    ['Vietnã', 'VN', 'VND'],
  ],
  currencies: [
    ['USD', 'Dólar americano', 'US'], ['EUR', 'Euro', 'EU'], ['JPY', 'Iene japonês', 'JP'],
    ['GBP', 'Libra esterlina', 'GB'], ['CNY', 'Yuan chinês', 'CN'], ['AUD', 'Dólar australiano', 'AU'],
    ['CAD', 'Dólar canadense', 'CA'], ['CHF', 'Franco suíço', 'CH'], ['HKD', 'Dólar de Hong Kong', 'HK'],
    ['SGD', 'Dólar de Singapura', 'SG'], ['SEK', 'Coroa sueca', 'SE'], ['KRW', 'Won sul-coreano', 'KR'],
    ['NOK', 'Coroa norueguesa', 'NO'], ['NZD', 'Dólar neozelandês', 'NZ'], ['INR', 'Rúpia indiana', 'IN'],
    ['MXN', 'Peso mexicano', 'MX'], ['TWD', 'Dólar taiwanês', 'TW'], ['ZAR', 'Rand sul-africano', 'ZA'],
    ['DKK', 'Coroa dinamarquesa', 'DK'], ['AED', 'Dirham dos Emirados', 'AE'],
  ],
};
