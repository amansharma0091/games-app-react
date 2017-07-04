import { normalize, schema } from 'normalizr'
import { camelizeKeys } from 'humps'

// Extracts the next page URL from Github API response.
const getNextPageUrl = response => {
  const link = response.headers.get('link')
  if (!link) {
    return null
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
  if (!nextLink) {
    return null
  }

  return nextLink.split(';')[0].slice(1, -1)
}

const API_ROOT = 'https://games-api-dev.herokuapp.com/api/'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint, token, schema) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl, {
    method: 'get',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
    }
    })
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }

        const camelizedJson = camelizeKeys(json)
        const nextPageUrl = getNextPageUrl(response)

        const result = Object.assign({},
          normalize(camelizedJson, schema),
          { nextPageUrl })

        return result
        
      })
    ).catch(error=>{
      console.log("API CALL ERROR : "+JSON.stringify(error))
    })
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// GitHub's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

const userSchema = new schema.Entity('users', {}, {
  idAttribute: user => user.login.toLowerCase()
})

const repoSchema = new schema.Entity('repos', {
  owner: userSchema
}, {
  idAttribute: repo => repo.fullName.toLowerCase()
})

const gameSchema = new schema.Entity('games', {}, {
  idAttribute: game => game.id
})

const discoverySchema = new schema.Entity("discoveries", {}, {})

// Schemas for Github API responses.
export const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  REPO: repoSchema,
  REPO_ARRAY: [repoSchema],
  GAME: gameSchema,
  GAME_ARRAY: [gameSchema],
  DISCOVERY: discoverySchema,
  DISCOVERY_ARRAY: [discoverySchema]
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {

  const callAPI = action[CALL_API]

  console.log("I was here!" + JSON.stringify(action))

  if (typeof callAPI === 'undefined') {
    return next(action)
  }


  let { endpoint } = callAPI
  const { schema, types, token } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if(!token){
    throw new Error('Unauthenticated request!')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, token, schema).then(
    response => next(actionWith({
      payload:response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}
