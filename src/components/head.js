import Head from 'next/head'

export default ({ titleContent = 'Rozbijeme spolu džbán!', children }) => (
  <Head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="description" content="♥ Svatba Petra a Šárky – 30. 6. 2018 ♥" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="RozbijemeDzban" />
    <meta property="og:title" content="🏺 Rozbijeme spolu džbán!" />
    <meta property="og:image" content={`/static/spolecna.png`} />
    <meta
      property="og:description"
      content="♥ Svatba Petra a Šárky – 30. 6. 2018 ♥"
    />

    <title>{titleContent}</title>
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans|PT+Serif:400i&amp;subset=cyrillic,cyrillic-ext,latin-ext"
      rel="stylesheet"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/static/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/static/favicon-16x16.png"
    />
    {children}
  </Head>
)
