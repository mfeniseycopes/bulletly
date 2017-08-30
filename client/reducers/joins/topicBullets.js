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
  REMOVE_TOPIC, 
} from '../../actions'

const topicBullets = (state={}, {type, payload}) => {

  let bullet, bullets, bullet_ids, topic

  switch(type) {

    case RECEIVE_BULLET:
      bullet = payload.bullet
      if (bullet.parent_id) return state
      bullet = payload.bullet
      return assocPath([bullet.topic_id, bullet.id], bullet.id, state)

    case RECEIVE_BULLETS:
      bullets = payload.bullets.filter(b => !b.parent_id)
      return map(
        bs => bs.reduce((obj, b) => assoc(b.id, b.id, obj), {}),
        groupBy(b => b.topic_id, bullets))

    case REMOVE_BULLET:
      bullet = payload.bullet
      const path = [bullet.topic_id, bullet.id].map(toString)
      return dissocPath(path, state)

    case REMOVE_TOPIC:
      topic = payload.topic
      return dissoc(topic.id, state)

    default:
      return state
  }
}

export default topicBullets
