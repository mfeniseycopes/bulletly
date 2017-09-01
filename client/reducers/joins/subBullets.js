import { 
  combineReducers, 
} from 'redux'

import {
  assoc,
  assocPath,
  clone,
  dissoc,
  dissocPath,
  groupBy,
  insert,
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
} from '../../actions'

const subBullets = (state={}, {type, payload}) => {

  let bullet, oldBullet, bullets

  switch(type) {

    case RECEIVE_BULLET:
      bullet = payload.bullet
      oldBullet = payload.oldBullet

      // new
      if (!oldBullet)
        return assoc(
          bullet.parent_id, 
          insert(
            bullet.ord - 1,
            bullet.id,
            state[bullet.parent_id] || []),
          state)

      // neither
      if (bullet.parent_id === oldBullet.parent_id && 
          bullet.ord === oldBullet.ord) 
        return state

      // indent/outdent
      let newState = state
      newState = oldBullet.parent_id ? assoc(
        oldBullet.parent_id, 
        remove(oldBullet.ord - 1, 1, state[oldBullet.parent_id]),
        newState) : newState
      newState = bullet.parent_id ? assoc(
        bullet.parent_id,
        insert(bullet.ord - 1, bullet.id, state[bullet.parent_id] || []),
        newState) : newState
      return newState

    case RECEIVE_BULLETS:
      bullets = payload.bullets.filter(b => b.parent_id)
      return map(
        bs => map(prop('id'), sortBy(prop('ord'), bs)),
        groupBy(b => b.parent_id, bullets))

    case REMOVE_BULLET:
      bullet = payload.bullet
      if (!bullet.parent_id) return state
      return assoc(bullet.parent_id,
        remove(bullet.ord - 1, 1, state[bullet.parent_id]),
        state)

    default:
      return state
  }
}

export default subBullets
