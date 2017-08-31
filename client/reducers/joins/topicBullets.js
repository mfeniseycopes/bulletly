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
  REMOVE_TOPIC, 
  SHIFT_BULLET_ORDS,
} from '../../actions'

const topicBullets = (state={}, {type, payload}) => {

  let bullet, bullets, bullet_ids, topic

  switch(type) {

    case RECEIVE_BULLET:
      bullet = payload.bullet
      if (bullet.parent_id) return state
      return assoc(bullet.topic_id,
        insert(bullet.ord - 1, bullet.id, state[bullet.topic_id]))

    case RECEIVE_BULLETS:
      bullets = payload.bullets.filter(b => !b.parent_id)
      return map(
        bs => map(prop('id'), sortBy(prop('ord'), bs)),
        groupBy(b => b.topic_id, bullets))

    case REMOVE_BULLET:
      bullet = payload.bullet
      if (bullet.parent_id) return state
      return assoc(bullet.topic_id,
        remove(bullet.ord - 1, 1, state[bullet.topic_id]))

    case REMOVE_TOPIC:
      topic = payload.topic
      return dissoc(topic.id, state)

    case SHIFT_BULLET_ORDS:
      const { topic_id, parent_id, start, shift } = payload.options
      if (parent_id) return state
      const ids = state[topic_id]
      return assoc(topic_id, remove(start - 2, 1, ids), state)

    default:
      return state
  }
}

export default topicBullets
