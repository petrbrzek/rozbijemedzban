import React from 'react'
import { H2 } from 'glamorous'
import { graphql, compose } from 'react-apollo'
import withData from '../src/apollo-setup/with-data'
import { loggedInUser, authenticateUser, listAllAttendees } from '../src/queries'

class AdminPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Administrace</h1>
        <div className="separator" />
        <RestrictedContent>
          <ListAttendees />
        </RestrictedContent>
        <style jsx global>{`
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
          padding-bottom: 1rem;
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
        .separator {
          height: 7px;
          background: #000;
        }
        `}</style>
      </div>
    )
  }
}

class ListAttendeesView extends React.Component {
  handleLogout = () => {
    window.localStorage.removeItem('graphcoolToken')
    window.location.reload()
  }

  render() {
    if (!this.props.data) { return null }
    if (this.props.data.loading) {
      return (
        <h1>Načítání...</h1>
      )
    }

    if (!this.props.data.allAttendees) {
      return (
        <div>
          <h1>Nemáš oprávnění na to vidět obsah této stránky</h1>
          <button onClick={this.handleLogout}>Odhlásit se</button>
        </div>
      )
    }

    return (
      <div className="root">
        {this.props.data.allAttendees.map((item, index) => (
          <div className="item" key={item.id}>
            <div className="iterator">
              <b>{index + 1}. </b>
            </div>
            <div className="cell">
              <b>{item.fullName}</b>
            </div>
            <div className="cell">
              {item.email || <span>E-mail nezadán</span>}
            </div>
            <div className="cell">
              {item.attends ? <b>Přijde</b> : <span>Nepřijde</span>}
            </div>
            <div className="cell">
              {item.plusOneMember ? <b>+1</b> : <span>sám</span>}
            </div>
          </div>
        ))}

        <div className="stats">
          <p>
            <span>Celkem přijde lidí (včetně +1): </span>
            <b className="count">
              {this.props.data.allAttendees.reduce((result, nextAttendee) => {
                return result + 1 + Number(nextAttendee.plusOneMember)
              }, 0)}
            </b>
          </p>
        </div>

        <style jsx>{`
          p {
            padding: 0 1rem;
          }
          .count {
            display: inline-block;
            padding: 1rem;
          }
          .stats {
            border-top: 7px solid black;
            padding-top: 1rem;
          }
          .iterator {
            margin-right: 2rem;
          }
          .item {
            display: flex;
            flex: 1;
            flex-direction: row;
            padding: 2rem 1rem;
          }
          .item:nth-of-type(odd) {
            background: #f3f3f3;
          }
          .cell {
            display: flex;
            flex: 1;
          }

        `}</style>
      </div>
    )
  }
}

const ListAttendees = compose(
  graphql(listAllAttendees),
)(ListAttendeesView)

class RestrictedContentView extends React.Component {
  state = {
    email: null,
    password: null,
    dirty: false,
    error: null,
  }

  _handleLogin = () => {
    if (!this.state.dirty) {
      this.setState({ dirty: true })
    }

    const { email, password } = this.state
    if (!email && !password) {
      return
    }

    this.props
      .authenticateUser({
        variables: {
          email,
          password,
        },
      })
      .then(response => {
        const graphcoolToken = response.data.authenticateUser.token
        localStorage.setItem('graphcoolToken', graphcoolToken)
        this.props.data.refetch()
        this.setState({
          dirty: false,
          error: null,
        })
      })
      .catch(reason => {
        console.log('AuthenticateUser failed ')
        this.setState({
          error: 'Login failed',
        })
      })
  }

  render() {
    console.log(this.props)
    const data = this.props.data
    if (!data) {
      return null
    }

    if (data.loading) {
      return (
        <div>
          <h1>Načítání...</h1>
        </div>
      )
    }

    const { loggedInUser } = data
    if (!loggedInUser) {
      return (
        <div>
          <h1>Zakázaná zóna. Nejdřív se přihlaš</h1>
          <div>
            <input
              type="email"
              placeholder="E-mail"
              onChange={e => e && this.setState({ email: e.target.value })}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={e => e && this.setState({ password: e.target.value })}
            />
          </div>
          <div>
            <button onClick={this._handleLogin}>Přihlásit se</button>
          </div>
          {this.state.dirty ? (
            <div>
              {!this.state.email && <h2>E-mail je povinný</h2>}
              {!this.state.password && <h2>Heslo je povinný</h2>}
            </div>
          ) : null}
          {this.state.error ? <H2 color="red">{this.state.error}</H2> : null}
        </div>
      )
    }

    return <div>{this.props.children}</div>
  }
}

const RestrictedContent = compose(
  graphql(loggedInUser),
  graphql(authenticateUser, {
    name: 'authenticateUser',
  })
)(RestrictedContentView)

export default withData(AdminPage)
