import { normalizeArr, identity } from './util.js'

const RECEIVE_SINGLE_BULLET = 'RECEIVE_SINGLE_BULLET'
const RECEIVE_SINGLE_TOPIC = 'RECEIVE_SINGLE_TOPIC'

const bullets = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_SINGLE_BULLET:
      return Object.assign({}, state, normalizeArr(...payload.bullet))
    case RECEIVE_SINGLE_TOPIC:
      return Object.assign({}, state, normalizeArr(payload.bullets))
    default:
      return state
  }
}

export default bullets
