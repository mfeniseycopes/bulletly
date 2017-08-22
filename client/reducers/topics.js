import { normalizeArr, identity } from './util.js'

const RECEIVE_SINGLE_TOPIC = 'RECEIVE_SINGLE_TOPIC'
const RECEIVE_MULTIPLE_TOPICS = 'RECEIVE_MULTIPLE_TOPICS'

const topics = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_SINGLE_TOPIC:
      return Object.assign({}, state, normalizeArr(...payload.topic))
    case RECEIVE_MULTIPLE_TOPICS:
      return Object.assign({}, state, normalizeArr(payload.topics))
    default:
      return state
  }
}

export default topics 
