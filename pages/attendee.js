import Head from '../src/components/head'
import React from 'react'
import { H2, P } from 'glamorous'
import { graphql, compose } from 'react-apollo'
import withData from '../src/apollo-setup/with-data'
import { signUpProvisionalUser, showSpecificAttendee, changeAttendsState, changePlusOneState, addViewToAttendee } from '../src/queries'

const copy = {
  loading: 'Načítám data o pozvánce...',
  noInvite: 'Bohužel nebyla nalezena žádná pozvánka. Pokud si myslíte, že je to chyba, tak se ozvěte Petrovi nebo Šárce',
}


class AttendeeDetailPage extends React.Component {
  render() {
    let inviteId
    if (this.props.url && this.props.url.query) {
      inviteId = this.props.url.query.invite || ''
      inviteId = inviteId.replace(/\/$/, '')
    }

    let content = (
      <AttendeeContent
        client={this.props.client}
        attendeeId={inviteId}
      />
    )
    if (!inviteId) {
      content = (
        <div className="layout">
          <h1>{copy.noInvite}</h1>
        </div>
      )
    }

    const data = this.props.data
    if (data && data.loading) {
      content = (
        <div className="layout">
          <h1>{copy.loading}</h1>
        </div>
      )
    }

    return (
      <div>
        <Head />
        {content}

        <style global jsx>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          @font-face {
            font-family: 'Gotham';
            src: url('http://cldup.com/GoUKsiJHY5.eot');
            src: url('http://cldup.com/GoUKsiJHY5.eot?#iefix')
                format('embedded-opentype'),
              url('https://cldup.com/56DqDDRMNy.woff2') format('woff2'),
              url('http://cldup.com/jL8uvoxVkp.woff') format('woff'),
              url('http://cldup.com/zvyd2sKPlE.ttf') format('truetype');
            font-weight: 500;
            font-style: normal;
          }
          @font-face {
            font-family: 'Gotham';
            src: url('http://cldup.com/Nzugi9bWhF.eot');
            src: url('http://cldup.com/Nzugi9bWhF.eot?#iefix')
                format('embedded-opentype'),
              url('https://cldup.com/C9Y1N5Qf43.woff2') format('woff2'),
              url('https://cldup.com/pixHn5aVxl.woff') format('woff'),
              url('http://cldup.com/ucdaZLKgg7.ttf') format('truetype');
            font-weight: bold;
            font-style: normal;
          }
          html,
          body {
            font-size: 10px;
            font-family: 'Open Sans', sans-serif;
            line-height: 1.5;
          }
          h1,
          h2,
          h3 {
            font-family: Gotham, sans-serif;
            font-size: 5rem;
            line-height: 1.1;
            letter-spacing: -0.2rem;
            padding-top: 2.5rem;
            padding-bottom: 2rem;
          }
          h2 {
            padding-top: 3rem;
            padding-bottom: 1rem;
          }
          h3 {
            font-size: 4rem;
            padding: 1rem 0;
          }
          .root {
            font-size: 2.5rem;
          }
          a {
            color: rgba(84, 58, 12, 1);
            text-decoration: none;
          }
          .layout {
            width: 700px;
            padding: 0 1rem 5rem;
            margin: auto;
          }
          .text-center {
            text-align: center;
          }

          @media (max-width: 700px) {
            html, body {
              font-size: 8px;
            }
            .layout {
              width: 100%;
            }
          }
        `}</style>
      </div>
    )
  }
}


const GOING = 'GOING'
const NOT_GOING = 'NOT_GOING'

class AttendeeContentView extends React.Component {
  state = {
    Attendee: null,
    loading: true,
    going: null,
    plusOne: null,
  }

  componentDidMount() {
    this._signUpProvisionalUser()
  }

  async _signUpProvisionalUser() {
    try {
      const response = await this.props.signUpProvisionalUser({
        variables: {
          attendeeId: this.props.attendeeId,
        }
      })
      const graphcoolToken = response.data.provisionalSignUp.token
      localStorage.setItem('graphcoolToken', graphcoolToken)
      this._requestAttendee()
    } catch (error) {
      console.error('Error #signUpProvisionalUser: ', error)
      this.setState({
        loading: false,
      })
    }
  }

  _addView = async (visits) => {
    try {
      await this.props.addViewToAttendee({
        variables: {
          attendeeId: this.props.attendeeId,
          visits: visits + 1,
        }
      })
    } catch (error) {
      console.error('Error #_addView: ', error)
    }
  }

  _requestAttendee = () => {
    this.props.client.query({
      query: showSpecificAttendee,
      fetchPolicy: 'network-only',
      variables: {
        attendeeId: this.props.attendeeId
      }
    })
      .then((result) => {
        console.log('Result ', result.data, result.data.Attendee)
        const attendee = result.data.Attendee
        this.setState({
          Attendee: attendee,
          loading: false,
        })
        this._addView(attendee.visits)
      })
  }

  _handleGoing = (going) => {
    this.setState({
      going,
    })
    this.props.changeAttendsState({
      variables: {
        attendeeId: this.props.attendeeId,
        attends: going,
      }
    })
      .then(response => {
        this._requestAttendee()
      })
      .catch(reason => {
        console.error('Error #changeAttendsState: ', reason)
      })
  }

  _handlePlusOne = (plusOne) => {
    this.setState({
      plusOne,
    })
    this.props.changePlusOneState({
      variables: {
        attendeeId: this.props.attendeeId,
        plusOneMember: plusOne,
      }
    })
      .then(response => {
        this._requestAttendee()
      })
      .catch(reason => {
        console.error('Error #changePlusOneState: ', reason)
      })
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="layout text-center">
          <h1>{copy.loading}</h1>
        </div>
      )
    }

    const { Attendee } = this.state
    if (!Attendee) {
      return (
        <div className="layout text-center">
          <h1>{copy.noInvite}</h1>
        </div>
      )
    }

    const goingState = (this.state.going || Attendee.attends)
    let goingClassName = ''
    let goingCopy = 'ZATÍM BEZ ODPOVĚDI'
    if (goingState === GOING) {
      goingClassName = 'positive'
      goingCopy = 'PŘIJDEŠ. TO JE SUPER, TĚŠÍME SE!'
    } else if (goingState === NOT_GOING) {
      goingClassName = 'negative'
      goingCopy = 'NEPŘIJDEŠ. ŠKODA, TAK SNAD JINDY.'
    }

    const plusOneState = (this.state.plusOne != null) ? this.state.plusOne : Attendee.plusOneMember
    let plusOneClassName = ''
    let plusOneCopy = 'ZATÍM BEZ ODPOVĚDI'
    if (plusOneState) {
      plusOneClassName = 'positive'
      plusOneCopy = 'SUPER. BUDEME S TÍM POČÍTAT.'
    } else if (plusOneState === false) {
      plusOneClassName = 'negative'
      plusOneCopy = 'OK. DÍKY ZA ODPOVĚĎ.'
    }
    

    return (
      <div className="layout">
        <h1>POZVÁNKA<br />
            NA SVATBU<br />
            PETRA A ŠÁRKY<br />
            <b className="highlight">30. 6. 2018</b>
        </h1>
        <div className="separator" />
        <h2 className="unhighlight">
          PRO HOSTA JMÉNEM:
        </h2>
        <h3>{Attendee.fullName}</h3>

        <div className="box">
          <h2 className="unhighlight">
            DEJ NÁM VĚDET,<br />
            ZDA DORAZÍŠ:
          </h2>
          <div className={`box ${goingClassName}`}>
            <button className="button positive-btn" onClick={() => { this._handleGoing(GOING) }}>Ano, přijdu.</button>
            <button className="button negative-btn" onClick={() => { this._handleGoing(NOT_GOING) }}>Ne, nepřijdu.</button>
          </div>
          <h3><span className="unhighlight">TVÁ ODPOVĚĎ:</span> {goingCopy}</h3>
        </div>

        <div className="box">
          <h2 className="unhighlight">
            BUDEŠ MÍT S SEBOU,<br />
            DOPROVOD?
          </h2>
          <div className={`box ${plusOneClassName}`}>
            <button className="button positive-btn" onClick={() => { this._handlePlusOne(true) }}>Ano, budu mít doprovod.</button>
            <button className="button negative-btn" onClick={() => { this._handlePlusOne(false) }}>Ne, nebudu.</button>
          </div>
          <h3><span className="unhighlight">TVÁ ODPOVĚĎ:</span> {plusOneCopy}</h3>
        </div>

        <div className="box">
          <h2 className="unhighlight">
            ORGANIZAČNÍ INFORMACE
          </h2>
          <h3>
            Veškeré organizační informace, program a seznam darů bude uveden (pokud už není 😇) na hlavní stránce.
          </h3>
          <div className="box">
            <br /><br />
            <a href="/" className="button">OTEVŘÍT HLAVNÍ STRÁNKU</a>
          </div>
        </div>

        <style jsx>
        {`
          .box.positive .negative-btn,
          .box.negative .positive-btn {
            background: #454545;
          }
          .separator {
            width: 60%;
            height: 7px;
            background: #000;
          }
          .highlight {
            color: #C9174F;
          }
          .unhighlight {
            color: #8B8B8B;
          }
          .button {
            border: none;
            background: #C9174F;
            padding: 2rem;
            font-size: 1.5rem;
            color: #fff;
            border-radius: 5px;
            font-weight: bold;
            text-transform: uppercase;
            cursor: pointer;
            margin-right: 2rem;
            margin-bottom: 1rem;
          }
          .box {
            margin: 2rem 0 3rem;
          }
        `}
        </style>
      </div>
    )
  }
}

const AttendeeContent = compose(
  graphql(addViewToAttendee, {
    name: 'addViewToAttendee',
  }),
  graphql(signUpProvisionalUser, {
    name: 'signUpProvisionalUser',
  }),
  graphql(changeAttendsState, {
    name: 'changeAttendsState',
  }),
  graphql(changePlusOneState, {
    name: 'changePlusOneState',
  })
)(AttendeeContentView)


export default withData(AttendeeDetailPage)
