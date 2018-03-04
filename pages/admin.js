import React from 'react'
import { H2 } from 'glamorous'
import { graphql, compose } from 'react-apollo'
import withData from '../src/apollo-setup/with-data'
import { loggedInUser, authenticateUser, listAllAttendees } from '../src/queries'

class AdminPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Admin page</h1>
        <RestrictedContent>
          <ListAttendees />
        </RestrictedContent>
      </div>
    )
  }
}

class ListAttendeesView extends React.Component {
  render() {
    if (!this.props.data) { return null }
    if (this.props.data.loading) {
      return (
        <h1>Loading...</h1>
      )
    }

    if (!this.props.data.allAttendees) {
      return (
        <div>
          <h1>Nemáš oprávnění na to vidět obsah této stránky</h1>
        </div>
      )
    }

    return (
      <div>
        {this.props.data.allAttendees.map(item => (
          <div>
            <b>{item.fullName}</b>
          </div>
        ))}
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
          <h1>Loading...</h1>
        </div>
      )
    }

    const { loggedInUser } = data
    if (!loggedInUser) {
      return (
        <div>
          <h1>Restricted area. Please log in first</h1>
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
            <button onClick={this._handleLogin}>Log in</button>
          </div>
          {this.state.dirty ? (
            <div>
              {!this.state.email && <h2>E-mail field is required</h2>}
              {!this.state.password && <h2>Password field is required</h2>}
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
