import { 
  normalizeArr, 
  identity 
} from './util'

import {
  RECEIVE_TOPIC,
  RECEIVE_NEW_TOPIC, 
  RECEIVE_UPDATED_TOPIC, 
  RECEIVE_TOPICS, 
  REMOVE_TOPIC,
  RECEIVE_NEW_BULLET,
  REMOVE_BULLET,
} from '../actions'

const topics = (state = {}, { type, payload }) => {
  
  let bullet, topic, topics, newState;
  
  switch(type) {

    case RECEIVE_TOPIC:
      topic = Object.assign({}, payload.topic)
      topic.bullet_ids = topic.bullets.map(bullet => bullet.id)
      delete topic.bullets
      newState = Object.assign({}, state, normalizeArr([topic]))
      break

    case RECEIVE_NEW_TOPIC:
      topic = Object.assign({}, payload.topic)
      topic.bullet_ids = []
      newState = Object.assign({}, state, normalizeArr([topic]))
      break

    case RECEIVE_UPDATED_TOPIC:
      topic = Object.assign({}, state[payload.topic.id], payload.topic)
      newState = Object.assign({}, state, normalizeArr([topic]))
      break

    case RECEIVE_TOPICS:
      topics = payload.topics.forEach(topic => topic.bullet_ids = [])
      newState = Object.assign({}, state, normalizeArr(payload.topics))
      break
      
    case REMOVE_TOPIC:
      newState = Object.assign({}, state)
      delete newState[payload.topic.id]
      break

    case RECEIVE_NEW_BULLET:
      bullet = payload.bullet
      newState = Object.assign({}, state)
      newState[bullet.topic_id].bullet_ids.push(bullet.id)
      break

    case REMOVE_BULLET:
      bullet = payload.bullet
      newState = Object.assign({}, state)
      const idx = newState[bullet.topic_id].bullet_ids
        .indexOf(bullet.id)
      newState[bullet.topic_id].bullet_ids = 
        newState[bullet.topic_id].bulletIds.splice(idx, 1)
      break

    default:
      return state
  }

  return newState
}

export default topics 
