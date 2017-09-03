import { 
  combineReducers, 
} from 'redux'

import {
  assoc,
  assocPath,
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
  REMOVE_TOPIC, 
} from '../../actions'

const topicBullets = (state={}, {type, payload}) => {

  let bullet, oldBullet, bullets, bullet_ids, topic

  switch(type) {

    case RECEIVE_BULLET:
      bullet = payload.bullet
      oldBullet = payload.oldBullet


      // new
      if (!oldBullet && !bullet.parent_id)
        return assoc(
          bullet.topic_id, 
          insert(
            bullet.ord - 1,
            bullet.id,
            state[bullet.topic_id]),
          state)
      
      // neither
      if (!oldBullet && bullet.parent_id || 
        (bullet.topic_id === oldBullet.topic_id && 
        bullet.ord === oldBullet.ord))
        return state

      // indent/outdent
      let newState = state
      newState = !oldBullet.parent_id ? assoc(
        oldBullet.topic_id, 
        remove(oldBullet.ord - 1, 1, state[oldBullet.topic_id]),
        newState) : newState
      newState = !bullet.parent_id ? assoc(
        bullet.topic_id,
        insert(bullet.ord - 1, bullet.id, state[bullet.topic_id] || []),
        newState) : newState
      return newState

    case RECEIVE_BULLETS:
      bullets = payload.bullets.filter(b => !b.parent_id)
      return map(
        bs => map(prop('id'), sortBy(prop('ord'), bs)),
        groupBy(b => b.topic_id, bullets))

    case REMOVE_BULLET:
      bullet = payload.bullet
      if (bullet.parent_id) return state
      return assoc(bullet.topic_id,
        remove(bullet.ord - 1, 1, state[bullet.topic_id]), 
        state)

    case REMOVE_TOPIC:
      topic = payload.topic
      return dissoc(topic.id, state)

    default:
      return state
  }
}

export default topicBullets
