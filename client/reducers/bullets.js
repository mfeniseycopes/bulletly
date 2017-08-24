import { normalizeArr, identity } from './util.js'
import { 
  REMOVE_TOPIC, 
  RECEIVE_BULLET, 
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
      if (!state[bullet.id] && bullet.parent_id) 
        newState[bullet.parent_id]
          .child_ids
          .push(bullet.id)
      break

    case RECEIVE_BULLETS:
      newState = 
        Object.assign({}, state)
      payload.bullets.forEach(
        bullet => {
          newState[bullet.id] = withChildIds(bullet, newState)
          if (!state[bullet.id] && bullet.parent_id) 
            newState[bullet.parent_id]
              .child_ids
              .push(bullet.id)
        }) 
      break

    case REMOVE_BULLET:
      bullet = payload.bullet
      newState = Object.assign({}, state)
      delete newState[bullet.id]
      if (bullet.parent_id) {
        const idx = newState[bullet.parent_id].child_ids
          .indexOf(bullet.id)
        newState[bullet.parent_id].child_ids = 
          newState[bullet.parent_id].child_ids.splice(idx, 1)
      }
      break

    case REMOVE_TOPIC:
      newState = Object.keys(state)
        .filter(id => state[id].topic_id !== payload.topic.id)
        .map((obj, id) => state[id])

    default:
      return state
  }

  return newState
}

export default bullets
