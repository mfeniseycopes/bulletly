import { 
  combineReducers, 
} from 'redux'
import {
  assoc,
  dissoc,
  groupBy,
  map,
  merge,
} from 'ramda'

import { 
  REMOVE_TOPIC, 
  RECEIVE_BULLET, 
  RECEIVE_BULLETS, 
  REMOVE_BULLET 
} from '../actions'

const topicBullets = (state={}, {type, payload}) => {

  switch(type) {

    case RECEIVE_BULLET:
      return merge(
        state, 
        map(
          b => b.id, 
          groupBy(b => b.topic_id, [payload.bullet])))

    case RECEIVE_BULLETS:
      return map(
        bs => map(b => b.id, bs),
        groupBy(b => b.topic_id, payload.bullets))

    case REMOVE_BULLET:
      return 

    case REMOVE_TOPIC:
      return dissoc(payload.topic.id, state)

    default:
      return state
  }

}

export default combineReducers({ topicBullets }) 
