import { 
  combineReducers, 
} from 'redux'

import {
  assoc,
  assocPath,
  dissoc,
  dissocPath,
  groupBy,
  map,
  prop,
  remove,
  sortBy,
  toString,
} from 'ramda'

import { 
  RECEIVE_BULLET, 
  RECEIVE_BULLETS, 
  REMOVE_BULLET,
  SHIFT_BULLET_ORDS,
} from '../../actions'

const subBullets = (state={}, {type, payload}) => {

  let bullet, bullets

  switch(type) {

    case RECEIVE_BULLET:
      bullet = payload.bullet
      if (!bullet.parent_id) return state
      return assoc(bullet.parent_id,
        insert(bullet.ord - 1, bullet.id, state[bullet.parent_id]))

    case RECEIVE_BULLETS:
      bullets = payload.bullets.filter(b => b.parent_id)
      return map(
        bs => map(prop('id'), sortBy(prop('ord'), bs)),
        groupBy(b => b.parent_id, bullets))

    case REMOVE_BULLET:
      bullet = payload.bullet
      if (!bullet.parent_id) return state
      return assoc(bullet.topic_id,
        remove(bullet.ord - 1, 1, state[bullet.parent_id]))

    case SHIFT_BULLET_ORDS:
      const { parent_id, start, shift } = payload.options
      if (!parent_id) return state
      const ids = state[parent_id]
      return assoc(parent_id, remove(start - 2, 1, ids), state)

    default:
      return state
  }
}

export default subBullets
