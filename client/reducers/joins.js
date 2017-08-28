import { 
  combineReducers, 
} from 'redux'
import {
  append,
  assoc,
  assocPath,
  dissoc,
  dissocPath,
  groupBy,
  map,
  merge,
} from 'ramda'

import { 
  REMOVE_TOPIC, 
  RECEIVE_NEW_BULLET,
  RECEIVE_BULLET, 
  RECEIVE_BULLETS, 
  REMOVE_BULLET 
} from '../actions'

const topicBullets = (state={}, {type, payload}) => {

  let bullet, bullets, bullet_ids, topic

  switch(type) {

    case RECEIVE_NEW_BULLET:
      bullet = payload.bullet
      return assocPath([bullet.topic_id, bullet.id], bullet.id, state)

    case RECEIVE_BULLETS:
      bullets = payload.bullets
      return map(
        bs => bs.reduce((obj, b) => assoc(b.id, b.id, obj), {}),
        groupBy(b => b.topic_id, bullets))

    case REMOVE_BULLET:
      bullet = payload.bullet
      return dissocPath([bullet.topic_ic, bullet.id], state)

    case REMOVE_TOPIC:
      topic = payload.topic
      return dissoc(topic.id, state)

    default:
      return state
  }

}

export default combineReducers({ topicBullets }) 
