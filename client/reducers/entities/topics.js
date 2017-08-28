import {
  assoc,
  dissoc,
  filter,
  groupBy,
  head,
  map,
} from 'ramda'

import {
  RECEIVE_TOPIC,
  RECEIVE_TOPICS, 
  REMOVE_TOPIC,
} from '../../actions'

const topics = (state = {}, { type, payload }) => {

  let bullet, topic, topics, newState;

  switch(type) {

    case RECEIVE_TOPIC:
      topic = payload.topic
      return assoc(topic.id, topic, state)

    case RECEIVE_TOPICS:
      return map(
        head,
        groupBy(topic => topic.id, payload.topics))

    case REMOVE_TOPIC:
      topic = payload.topic
      return dissoc(topic.id, state)

    default:
      return state
  }

  return newState
}

export default topics 
