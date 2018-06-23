import React from 'react'
import Head from '../src/components/head'
import { Timeline, TimelineEvent } from 'react-event-timeline'

const timeTable = [
  {
    time: '10:00',
    headline: 'Otvírá se kostel i místnost s pohoštěním ☕️🥖',
    desc: 'Parkování (zdarma): na sídlišti okolo kostela. K místnosti s pohoštěním dojdete kostelem, dovedou vás k ní směrovky. Pro maminky: naproti místnosti s pohoštěním je dětský koutek s přebalovacím pultem.',
  },
  {
    time: '11:00',
    headline: 'Začíná obřad 👰🏻👨🏻‍💻💒',
    desc: 'Obřad potrvá zhruba 30 minut a jeho přesnější průběh bude (formou tištěného programu) k dostání na místě. Po obřadu následuje společné 📷 focení v kostele a poté bude prostor pro občerstevní a gratulace 🎊.',
  },
  {
    time: '12:15',
    headline: 'Rozbijeme spolu džbán 🏺',
    desc: 'Staroegyptská tradice proběhne před kostelem (navede vás moderátor Lukáš).',
  },
  {
    time: '12:40',
    headline: '⚠️ ODJÍŽDÍ svatební tramvaj směr Grébovka',
    desc: <div><p>Objednanou tramvají odjíždí rodina na svatební oběd. AVŠAK kdo by se rád tramvají svezl do Grébovky také, může se připojit (dva vagóny tramvaje mají kapacitu ~100 míst, rodina zabere méně než půlku, takže se nezdráhejte nastoupit s námi).</p>
      <br />
      <p className="notice">První část svatby tímto končí.</p>
    </div>,
  },
  {
    time: '13:15',
    headline: '🍽 Rodinný oběd',
    desc: '',
  },
  {
    time: '15:00',
    headline: 'Začíná veselka pro všechny 🎉',
    desc: <div><br />
      <p className="notice">Přijďte včas do Pavilonu Grébovka 🙏</p>
      <p>Následující části programu již nebudou vázány na pevně stanovený čas.</p>
      <p><b>🌸 Nesezdaní</b> dostanou po příchodu květinový náramek.</p>
      <p><b>🚙 Parkování:</b> velmi omezené možnosti. Zkoušejte okolní ulice (např. Sámova), případně placené parkoviště v ulici Petrohradská (cca 150 Kč/den).</p>
    </div>,
  },
  {
    time: '',
    headline: 'Nutné zlo - focení 📸 🤡',
    desc: 'Nejprve se vyfotíme společně a potom si všichni můžou jít užívat připraveného pavilonu, zatímco novomanželé dofotí film (i když se jedná o digitální fotoaparát).',
  },
  {
    time: '',
    headline: '🍰 Krájení velkolepého dortu od nejlepšího cukráře ve vesmíru ✨',
    desc: '🎁 Nyní nastává vhodná příležitost k předání darů (nebudeme je rozbalovat, ale zatím je pečlivě uložíme).',
  },
  {
    time: '',
    headline: '👫 Svatební hra pro páry',
    desc: 'Nechte se překvapit 🙊',
  },
  {
    time: '',
    headline: '🍔 Grill párty a výuka tanečku Alunelul 🕺',
    desc: '',
  },
  {
    time: '',
    headline: '🏆 Tombola',
    desc: '',
  },
  {
    time: '',
    headline: '🎶 První tanec novomanželů a společně naučený Alunelul 🕺',
    desc: '',
  },
  {
    time: '',
    headline: '🎈 Volná zábava',
    desc: '',
  },
  {
    time: '00:00',
    headline: '💤 Zavírá se svatební den i Grébovka',
    desc: '',
  }
]


export default class TimeLine extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
        </Head>
        <h1 className="headline">🗓 Agenda</h1>
        {timeTable.map((event, index) => (
          <Timeline
            key={index}
            lineStyle={{
              width: '4px',
              marginLeft: '-2px',
              background: 'black',
            }}
          >
            <TimelineEvent
              createdAt={<h4 className="time">{event.time}</h4>}
              icon={<i className="material-icons md-18">brightness_1</i>}
              iconColor="black"
              contentStyle={{
                padding: '1rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
              }}
            >
              <h3 className="event-headline">{event.headline}</h3>
              <p>{event.desc}</p>
            </TimelineEvent>
          </Timeline>
        ))}

        <style global jsx>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          @font-face {
            font-family: 'Gotham';
            src: url('https://cldup.com/GoUKsiJHY5.eot');
            src: url('https://cldup.com/GoUKsiJHY5.eot?#iefix')
                format('embedded-opentype'),
              url('https://cldup.com/56DqDDRMNy.woff2') format('woff2'),
              url('https://cldup.com/jL8uvoxVkp.woff') format('woff'),
              url('https://cldup.com/zvyd2sKPlE.ttf') format('truetype');
            font-weight: 500;
            font-style: normal;
          }
          @font-face {
            font-family: 'Gotham';
            src: url('https://cldup.com/Nzugi9bWhF.eot');
            src: url('https://cldup.com/Nzugi9bWhF.eot?#iefix')
                format('embedded-opentype'),
              url('https://cldup.com/C9Y1N5Qf43.woff2') format('woff2'),
              url('https://cldup.com/pixHn5aVxl.woff') format('woff'),
              url('https://cldup.com/ucdaZLKgg7.ttf') format('truetype');
            font-weight: bold;
            font-style: normal;
          }
          html,
          body {
            font-size: 16px;
            background-color: #dfdbe5;
            background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.19' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
            font-family: 'Open Sans', sans-serif;
            line-height: 1.5;
          }
          .layout {
            width: 700px;
            padding: 0 1rem 5rem;
            margin: auto;
          }
          p {
            font-size: 1.5rem;
          }
          h1,
          h2,
          h3,
          h4 {
            font-family: Gotham, sans-serif;
            font-size: 3rem;
            line-height: 1.1;
            letter-spacing: -0.2rem;
          }
          h2 {
            padding-bottom: 1rem;
          }
          h4 {
            font-size: 1.6rem;
          }
          .notice {
            font-size: 2.2rem;
            font-weight: bold;
            font-family: Gotham, sans-serif;
            letter-spacing: -0.2rem;
          }
          .root {
            font-size: 2rem;
          }
          a {
            color: #9468e0;
            text-decoration: none;
            word-wrap: break-word;
          }
          .headline {
            text-align: center;
            padding: 0.8rem 0;
            background: #fff;
          }
          .event-headline {
            font-size: 2.7rem;
            padding-bottom: 1rem;
          }
          .time {
            color: #000;
            font-size: 2rem;
          }
        `}</style>
      </div>
    )
  }
}
