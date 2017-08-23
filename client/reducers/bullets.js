import { normalizeArr, identity } from './util.js'
import { 
  RECEIVE_TOPIC, 
  RECEIVE_UPDATED_TOPIC, 
  REMOVE_TOPIC, 
  RECEIVE_BULLET, 
  RECEIVE_NEW_BULLET, 
  RECEIVE_BULLETS, 
  REMOVE_BULLET 
} from '../actions'

const withChildIds = (bullet, state) => {
  const newBullet = Object.assign({}, bullet)

  newBullet.child_ids = Object.keys(state)
    .filter(key => state[key].parent_id === bullet.id)

  return newBullet
}


const bullets = (state = {}, { type, payload }) => {

  let bullet, newState

  switch(type) {
    case RECEIVE_BULLET:
      bullet = withChildIds(payload.bullet, state)
      newState = Object.assign({}, state, normalizeArr([bullet]))
      break
      
    case RECEIVE_BULLETS:
      newState = 
        Object.assign({}, state)
      payload.bullets.forEach(bullet => newState[bullet.id] = withChildIds(bullet, newState)) 
      break

    case REMOVE_BULLET:
      newState = Object.assign({}, state)
      delete newState[payload.bullet.id]
      break

    default:
      return state
  }

  return newState
}

export default bullets
