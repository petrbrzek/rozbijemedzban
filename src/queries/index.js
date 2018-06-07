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
      visits
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
      visits
    }
  }
`

export const changeAttendsState = gql`
  mutation ChangeAttendsState($attendeeId: ID!, $attends: ATTENDS_STATE!) {
    updateAttendee(id: $attendeeId, attends: $attends) {
      id
    }
  }
`

export const changePlusOneState = gql`
  mutation ChangePlusOneState($attendeeId: ID!, $plusOneMember: Boolean) {
    updateAttendee(id: $attendeeId, plusOneMember: $plusOneMember) {
      id
    }
  }
`

export const addViewToAttendee = gql`
  mutation AddViewToAttendee($attendeeId: ID!, $visits: Int) {
    updateAttendee(id: $attendeeId, visits: $visits) {
      id
    }
  }
`

export const addAttendee = gql`
  mutation AddAttendee($fullName: String!, $email: String, $attends: ATTENDS_STATE, $plusOneMember: Boolean) {
    createAttendee(
      fullName: $fullName
      email: $email
      attends: $attends
      plusOneMember: $plusOneMember
    ) {
      id
    }
  }
`

export const listAllGifts = gql`
  query ListAllGifts {
    allGifts {
      id
      who
      title
      desc
      reserved
    }
  }
`

export const reserveGift = gql`
  mutation reserveGift($id: ID!, $who: String) {
    updateGift(
      id: $id
      who: $who
      reserved: true
    ) {
      id
      reserved
      who
    }
  } 
`

export const isGiftReserved = gql`
  query Gift($id: ID!) {
    Gift(id: $id) {
      reserved
    }
  }
`
