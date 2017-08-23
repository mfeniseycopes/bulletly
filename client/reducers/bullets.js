import { normalizeArr, identity } from './util.js'
import { 
  RECEIVE_TOPIC, 
  RECEIVE_UPDATED_TOPIC, 
  REMOVE_TOPIC, 
  RECEIVE_BULLET, 
  RECEIVE_BULLETS, 
  REMOVE_BULLET 
} from '../actions'

const bullets = (state = {}, { type, payload }) => {

  let newState

  switch(type) {
    case RECEIVE_BULLET:
      newState = Object.assign({}, state, normalizeArr([payload.bullet]))
      break
      
    case RECEIVE_BULLETS:
      newState = 
        Object.assign({}, state, normalizeArr(payload.bullets))
      break

    case RECEIVE_TOPIC:
      newState = 
        Object.assign({}, state, normalizeArr(payload.topic.bullets))
      break

    case REMOVE_TOPIC:
      newState = Object.keys(state)
        .filter(key => state[key].topic_id !== payload.topic_id)
        .reduce((obj, key) => { obj[key] = state[key]; return obj; }, {})
      break

    case REMOVE_BULLET:
      break

    default:
      return state
  }

  return newState
}

export default bullets
