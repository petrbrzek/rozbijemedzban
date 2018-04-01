import gql from 'graphql-tag'

export const loggedInUser = gql`
  query LoggedInUser {
    loggedInUser {
      id
    }
  }
`

export const authenticateUser = gql`
  mutation AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`

export const listAllAttendees = gql`
  query ListAllAttendees {
    allAttendees {
      id
      fullName
      email
      attends
      plusOneMember
    }
  }
`

export const signUpProvisionalUser = gql`
  mutation ProvisionalSignUp($attendeeId: String!) {
    provisionalSignUp(attendeeId: $attendeeId) {
      id
      token
    }
  }
`

export const showSpecificAttendee = gql`
  query SpecificAttendee($attendeeId: ID!) {
    Attendee(id: $attendeeId) {
      fullName
      email
      attends
      plusOneMember
    }
  }
`

export const changeAttendsState = gql`
  mutation ChangeAttendsState($attendeeId: ID!, $attends: ATTENDS_STATE!) {
    updateAttendee(
      id: $attendeeId
      attends: $attends
    ) {
      id
    }
  }
`

export const changePlusOneState = gql`
  mutation ChangePlusOneState($attendeeId: ID!, $plusOneMember: Boolean) {
    updateAttendee(
      id: $attendeeId
      plusOneMember: $plusOneMember
    ) {
      id
    }
  }
`
