import React from 'react'
import { H2, P } from 'glamorous'
import { graphql, compose } from 'react-apollo'
import withData from '../src/apollo-setup/with-data'
import { signUpProvisionalUser, showSpecificAttendee, changeAttendsState } from '../src/queries'

class AttendeeDetailPage extends React.Component {

  render() {
    console.log(this)

    const data = this.props.data
    if (data && data.loading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }

    let inviteId
    if (this.props.url && this.props.url.query) {
      inviteId = this.props.url.query.invite
    }

    if (!inviteId) {
      return (
        <h1>No attendee found under given invitation id</h1>
      )
    }
    

    return (
      <div>
        <h1>AttendeeDetail</h1>
        <AttendeeContent
          client={this.props.client}
          attendeeId={inviteId}
        />
      </div>
    )
  }
}

class AttendeeContentView extends React.Component {
  state = {
    Attendee: null,
    loading: true,
  }

  componentDidMount() {
    const provisionalUser = this.props.signUpProvisionalUser({
      variables: {
        attendeeId: this.props.attendeeId,
      }
    })
      .then(response => {
        console.log(response)
        const graphcoolToken = response.data.provisionalSignUp.token
        localStorage.setItem('graphcoolToken', graphcoolToken)
        this._requestAttendee()
      })
      .catch(reason => {
        console.error('Error #signUpProvisionalUser: ', reason)
        this.setState({
          loading: false,
        })
      })
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
        this.setState({
          Attendee: result.data && result.data.Attendee,
          loading: false,
        })
      })
  }

  _handleClick = () => {
    this.props.changeAttendsState({
      variables: {
        attendeeId: this.props.attendeeId,
        attends: 'NOT_GOING'
      }
    })
      .then(response => {
        console.log(response)
        this._requestAttendee()
      })
      .catch(reason => {
        console.error('Error #changeAttendsState: ', reason)
      })
  }

  render() {
    console.log('AttendeeContentView ', this)

    if (this.state.loading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }

    const { Attendee } = this.state
    if (!Attendee) {
      return (
        <h1>No attendee found</h1>
      )
    }

    return (
      <div>
        <h1>{Attendee.fullName}</h1>
        <h2>{Attendee.attends}</h2>
        <button onClick={this._handleClick}>Nejdu na svatbu</button>
      </div>
    )
  }
}

const AttendeeContent = compose(
  graphql(signUpProvisionalUser, {
    name: 'signUpProvisionalUser',
  }),
  graphql(changeAttendsState, {
    name: 'changeAttendsState',
  })
)(AttendeeContentView)


export default withData(AttendeeDetailPage)
