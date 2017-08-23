import { 
  fetchTopics, 
  fetchTopic,
  postTopic,
  putTopic,
  deleteTopic,
  fetchBullets,
  fetchBullet,
  postBullet,
  putBullet,
  deleteBullet,
} from '../api'

const dispatchAction = (dispatch, action) => payload =>
  dispatch(action(payload))

export const [
  RECEIVE_BULLET,
  REMOVE_BULLET,
  RECEIVE_NEW_TOPIC,
  RECEIVE_UPDATED_TOPIC,
  REMOVE_TOPIC,
  RECEIVE_TOPICS,
] = [
  'RECEIVE_BULLET',
  'REMOVE_BULLET',
  'RECEIVE_NEW_TOPIC',
  'RECEIVE_UPDATED_TOPIC',
  'REMOVE_TOPIC',
  'RECEIVE_TOPICS',
]

const receiveTopics = topics => ({
  type: RECEIVE_TOPICS,
  payload: { topics },
})

const receiveNewTopic = topic => ({
  type: RECEIVE_NEW_TOPIC,
  payload: { topic, bullets: topic.bullets },
})

const receiveUpdatedTopic = topic => ({
  type: RECEIVE_UPDATED_TOPIC,
  payload: { topic },
})

const removeTopic = topic => ({
  type: REMOVE_TOPIC,
  payload: { topic },
})

const receiveBullet = bullet => ({
  type: RECEIVE_BULLET,
  payload: { bullet },
})

const removeBullet = bullet => ({
  type: REMOVE_BULLET,
  payload: { bullet }
})

export const retrieveTopics = () => dispatch =>
  fetchTopics()
    .then(dispatchAction(dispatch, receiveTopics))

export const retrieveTopic = id => dispatch =>
  fetchTopic(id)
    .then(dispatchAction(dispatch, receiveNewTopic))

export const createTopic = topic => dispatch =>
  postTopic(topic)
    .then(dispatchAction(dispatch, receiveNewTopic))

export const updateTopic = topic => dispatch =>
  putTopic(topic)
    .then(dispatchAction(dispatch, receiveUpdatedTopic))

export const destroyTopic = id => dispatch =>
  deleteTopic(id)
    .then(dispatchAction(dispatch, removeTopic))

