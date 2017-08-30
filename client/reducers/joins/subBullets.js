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
  toString,
} from 'ramda'

import { 
  RECEIVE_BULLET, 
  RECEIVE_BULLETS, 
  REMOVE_BULLET,
} from '../../actions'

const subBullets = (state={}, {type, payload}) => {

  let bullet, bullets

  switch(type) {

    case RECEIVE_BULLET:
      bullet = payload.bullet
      return assocPath([bullet.parent_id, bullet.id], bullet.id, state)

    case RECEIVE_BULLETS:
      bullets = payload.bullets
      return map(
        bs => bs.reduce((obj, b) => assoc(b.id, b.id, obj), {}),
        groupBy(b => b.parent_id, bullets))

    case REMOVE_BULLET:
      bullet = payload.bullet
      const path = [bullet.parent_id, bullet.id].map(toString)
      return bullet.parent_id ? 
        dissocPath(path, state) : state

    default:
      return state
  }
}

export default subBullets
