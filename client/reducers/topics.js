import { 
  normalizeArr, 
  identity 
} from './util'

import { 
  RECEIVE_NEW_TOPIC, 
  RECEIVE_UPDATED_TOPIC, 
  RECEIVE_TOPICS, 
  REMOVE_TOPIC 
} from '../actions'

const topics = (state = {}, { type, payload }) => {
  switch(type) {
    case RECEIVE_NEW_TOPIC:
    case RECEIVE_UPDATED_TOPIC:
      return Object.assign({}, state, normalizeArr([payload.topic]))
    case RECEIVE_TOPICS:
      return Object.assign({}, state, normalizeArr(payload.topics))
    case REMOVE_TOPIC:
      const newState = Object.assign({}, state)
      delete newState[payload.topic.id]
      return newState
    default:
      return state
  }
}

export default topics 
