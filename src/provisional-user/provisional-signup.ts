import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'

interface User {
  id: string
}

interface EventData {
  attendeeId: string
}

export default async (event: FunctionEvent<EventData>) => {
  console.log(event)

  try {
    const graphcool = fromEvent(event)
    const api = graphcool.api('simple/v1')

    const { attendeeId } = event.data

    // create new provisional user
    const userId = await createGraphcoolUser(api, attendeeId)

    // generate node token for new User node
    const token = await graphcool.generateNodeToken(userId, 'User')

    return { data: { id: userId, token } }
  } catch (e) {
    console.log(e)
    return { error: 'An unexpected error occured during signup.' }
  }
}

async function createGraphcoolUser(api: GraphQLClient, attendeeId: string): Promise<string> {
  const mutation = `
    mutation createGraphcoolUser($attendeeId: ID!) {
      createUser(
        attendeeId: $attendeeId
      ) {
        id
      }
    }
  `

  const variables = {
    attendeeId,
  }

  return api.request<{ createUser: User }>(mutation, variables)
    .then(r => r.createUser.id)
}
