import { normalizeArr, identity } from './util.js'
import { 
  RECEIVE_NEW_TOPIC, 
  RECEIVE_UPDATED_TOPIC, 
  REMOVE_TOPIC, 
  RECEIVE_BULLET, 
  REMOVE_BULLET 
} from '../actions'

const bullets = (state = {}, { type, payload }) => {
  switch(type) {
    case RECEIVE_BULLET:
      return Object.assign({}, state, normalizeArr([payload.bullet]))
    case RECEIVE_NEW_TOPIC:
      return Object.assign({}, state, normalizeArr(payload.bullets))
    case REMOVE_TOPIC:
      // this will need removal of all bullets with removed topicId
    case REMOVE_BULLET:
      // this will need recursive deletion
      return state
    default:
      return state
  }
}

export default bullets
