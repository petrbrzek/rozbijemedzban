import Head from 'next/head'

const Header = ({ children }) => (
  <div className="header">
    <div className="video-container">
      <video autoPlay muted loop>
        <source src="/static/dzban.mp4" type="video/mp4" />
      </video>
      <div className="overlay" />
    </div>
    <div className="layout">
      <h1>
        ROZBIJEME<br />
        SPOLU<br />
        DŽBÁN!
      </h1>
      <div className="separator" />
      <div className="quote">
        „Již jdu, již spěchám, již běžím, avšak říkal jsem to právě jen proto,
        abys měl ještě čas rozmyslit si, co chceš učinit, neboť rozbít džbán se
        ženou je vážný krok v životě muže a není vhodné učinit tak přenáhleně a
        neuváženě. Ale ovšem, půjdu pro džbán, ježto si tak přeješ, i nemohu
        tomu již zabránit.“
      </div>
      <div className="autor">– Kaptah z knihy Egyptan Sinuhet, s. 244</div>
      <div className="banner">
        <span>♥ Svatba Petra a Šárky – 30. 6. 2018 ♥</span>
      </div>
    </div>
    <style jsx>{`
      .header {
        height: 800px;
        color: #fff;
      }
      .separator {
        width: 65%;
        height: 1px;
        background: #fff;
      }
      .quote {
        width: 65%;
        font-family: 'PT Serif', sans-serif;
        font-size: 2rem;
        line-height: 1.9;
        padding-top: 2.5rem;
      }
      .autor {
        padding-top: 2rem;
        font-size: 2rem;
        font-family: Gotham, sans-serif;
      }
      .banner {
        padding-top: 6.5rem;
        display: flex;
        justify-content: center;
      }
      .banner span {
        font-family: Gotham, sans-serif;
        font-size: 2.2rem;
        display: inline-flex;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 90px;
        padding: 2.5rem 4rem;
      }
      video {
        position: relative;
        width: auto;
        min-width: 100%;
        height: auto;
        display: block;
        opacity: 0.8;
      }
      .video-container {
        width: 100%;
        max-height: 800px;
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        z-index: -100;
      }
      .overlay {
        position: absolute;
        width: 100%;
        height: 800px;
        top: 0;
        left: 0;
        background: rgba(84, 58, 12, 0.5);
        z-index: 1;
      }
      @media (max-width: 1199px) {
        .quote {
          width: 75%;
        }
      }
      @media (max-width: 939px) {
        video {
          left: -25%;
        }
        .header, .video-container, .overlay {
          height: 630px;
        }
      }
      @media (max-width: 670px) {
        video {
          left: -70%;
        }
      }
      @media (max-width: 700px) {
        .header, .video-container, .overlay {
          height: 110vw;
        }
      }
    `}</style>
  </div>
)

const Section = ({ headline, body }) => (
  <div className="section">
    <div className="layout">
      <h2>{headline}</h2>
      <div className="body">{body}</div>
    </div>

    <style jsx>{`
      .section {
        color: #000;
      }
      h2 {
      }
      .body {
        line-height: 2;
      }
      @media (max-width: 1199px) {
        
      }
    `}</style>
  </div>
)

export default () => (
  <div className="root">
    <Head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <meta name="description" content="♥ Svatba Petra a Šárky – 30. 6. 2018 ♥" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="RozbijemeDzban" />
      <meta property="og:title" content="🏺 Rozbijeme spolu džbán!" />
      <meta property="og:image" content={`/static/spolecna.png`} />
      <meta property="og:description" content="♥ Svatba Petra a Šárky – 30. 6. 2018 ♥" />

      <title>Rozbijeme spolu džbán!</title>
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans|PT+Serif:400i&amp;subset=cyrillic,cyrillic-ext,latin-ext"
        rel="stylesheet"
      />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
    </Head>
    <Header />
    <Section
      headline="MÍSTO A ČAS"
      body={
        <div>
          <p>
            1. Svatba se bude konat v <b>sobotu 30. června 2018</b>.
            <br />
            2. Obřad se bude konat v kostele Neposkvrněného Početí Panny Marie{' '}
            <b>(čas bude upřesněn)</b>.
            <br />
          </p>
          <div className="media-box">
            <img
              className="photo-rectangle"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Stra%C5%A1nice%2C_kostel_Panny_Marie_2.JPG/1200px-Stra%C5%A1nice%2C_kostel_Panny_Marie_2.JPG"
            />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10243.757053078563!2d14.4946962!3d50.0686991!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xbeb0ba88ac547986!2zxZjDrW1za29rYXRvbGlja8OhIGZhcm5vc3QgdSBrb3N0ZWxhIE5lcG9za3ZybsSbbsOpaG8gUG_EjWV0w60gUGFubnkgTWFyaWUgUHJhaGEgLSBTdHJhxaFuaWNl!5e0!3m2!1sen!2scz!4v1520186662408"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
          <p>
            3. Veselka začne od <b>15:00 v Pavilónu Grébovka.</b>
          </p>
          <div className="media-box">
            <img
              className="photo-rectangle"
              src="https://images.adsttc.com/media/images/5004/cfd7/28ba/0d4e/8d00/048b/slideshow/stringio.jpg?1414528309"
            />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.8861952540906!2d14.443405751370163!3d50.06969292250665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b9480e3e852a9%3A0xbf63aec5ad0783e6!2spavilion+Gr%C3%A9bovka!5e0!3m2!1sen!2scz!4v1520187493686"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        </div>
      }
    />
    <Section
      headline="CO PŘIPRAVUJEME"
      body={
        <div>
          <p>Organizace svatby probíhá v plném proudu. Aktuálně řešíme:</p>
          <div className="list">
            <p>
              ✅ Spuštění svatebního webu<br />
              ❌ Pozvánky a jejich rozeslání<br />
              ❌ Program svatby<br />
              ❌ Seznam darů<br />
              ❌ Logistiku (parkování aut, a další)<br />
            </p>
          </div>
        </div>
      }
    />

    <Section
      headline="KONTAKT"
      body={
        <div>
          <div className="media-box">
            <div className="contact">
              <p>V případě čehokoliv napište buď Petrovi nebo spíše Šárce:</p>
              <p style={{ paddingTop: '3rem' }}>
                – <a href="mailto:petrbrzek@gmail.com?subject=Svatba">petrbrzek@gmail.com</a><br />
                – <a href="mailto:sarkaholanova@seznam.cz?subject=Svatba">sarkaholanova@seznam.cz</a>
              </p>
            </div>
            <img src="/static/spolecna.png" className="photo-spolecna" style={{ marginTop: '-10rem' }} />
          </div>
        </div>
      }
    />

    <style jsx>{`
      .media-box {
        display: flex;
        align-items: align-start;
        margin: 2.5rem 0;
        justift-content: center;
      }
      .list {
        margin: 2.5rem;
      }
      .contact {
        width: 50%;
      }
    `}</style>

    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html,
      body {
        font-size: 10px;
        font-family: 'Open Sans', sans-serif;
        line-height: 1.5;
      }
      h1,
      h2 {
        font-family: Gotham, sans-serif;
        font-size: 10rem;
        line-height: 1;
        letter-spacing: -0.5rem;
        padding-top: 6rem;
        padding-bottom: 2.5rem;
      }
      .root {
        font-size: 2.5rem;
      }
      .layout {
        width: 1200px;
        margin: auto;
        padding: 0 1rem;
      }
      a {
        color: rgba(84, 58, 12, 1);
      }
      .media-box .photo-rectangle, .media-box iframe {
        width: 590px;
        height: 440px;
      }
      .media-box .photo-spolecna {
        width: 465px;
        height: 465px;
      }
      @media (max-width: 1199px) {
        .layout {
          width: 940px;
        }
        .media-box .photo-rectangle, .media-box iframe {
          width: 460px;
          height: 345px;
        }
      }
      @media (max-width: 939px) {
        .layout {
          width: 100%;
        }
        html,
        body {
          font-size: 1vw;
        }
        .media-box .photo-rectangle, .media-box iframe {
          width: 270px;
          height: 202px;
        }
        .media-box .photo-spolecna {
          width: 300px;
          height: 300px;
        }
      }
      @media (max-width: 700px) {
        html,
        body {
          font-size: 1.3vw;
        }
      }
      @media (max-width: 550px) {
        .media-box {
          flex-direction: column;
        }
        .media-box .photo-spolecna {
          display: none;
        }
      }
    `}</style>
  </div>
)
