import { 
  fetchTopics, 
  fetchTopic,
  postTopic,
  putTopic,
  deleteTopic,
  fetchBullets,
  fetchBullet,
  postTopicBullet,
  postSubBullet,
  putBullet,
  deleteBullet,
} from '../api'

const dispatchAction = (dispatch, action) => payload =>
  dispatch(action(payload))

export const [
  RECEIVE_BULLET,
  RECEIVE_NEW_BULLET,
  RECEIVE_BULLETS,
  REMOVE_BULLET,
  RECEIVE_TOPIC,
  RECEIVE_NEW_TOPIC,
  RECEIVE_UPDATED_TOPIC,
  REMOVE_TOPIC,
  RECEIVE_TOPICS,
] = [
  'RECEIVE_BULLET',
  'RECEIVE_NEW_BULLET',
  'RECEIVE_BULLETS',
  'REMOVE_BULLET',
  'RECEIVE_TOPIC',
  'RECEIVE_NEW_TOPIC',
  'RECEIVE_UPDATED_TOPIC',
  'REMOVE_TOPIC',
  'RECEIVE_TOPICS',
]

const receiveTopics = topics => ({
  type: RECEIVE_TOPICS,
  payload: { topics },
})

const receiveTopic = topic => ({
  type: RECEIVE_TOPIC,
  payload: { topic },
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

const receiveBullets = bullets => ({
  type: RECEIVE_BULLETS,
  payload: { bullets },
})

const receiveBullet = bullet => ({
  type: RECEIVE_BULLET,
  payload: { bullet },
})

const receiveNewBullet = bullet => ({
  type: RECEIVE_NEW_BULLET,
  payload: { bullet },
})

const removeBullet = bullet => ({
  type: REMOVE_BULLET,
  payload: { bullet }
})

// TOPIC THUNKS

export const retrieveTopics = () => dispatch =>
  fetchTopics()
    .then(dispatchAction(dispatch, receiveTopics))

export const retrieveTopic = id => dispatch =>
  fetchTopic(id)
    .then(dispatchAction(dispatch, receiveTopic))

export const createTopic = topic => dispatch =>
  postTopic(topic)
    .then(dispatchAction(dispatch, receiveNewTopic))

export const updateTopic = topic => dispatch =>
  putTopic(topic)
    .then(dispatchAction(dispatch, receiveUpdatedTopic))

export const destroyTopic = id => dispatch =>
  deleteTopic(id)
    .then(dispatchAction(dispatch, removeTopic))

// BULLET THUNKS

export const retrieveBullets = () => dispatch =>
  fetchBullets()
    .then(dispatchAction(dispatch, receiveBullets))

export const retrieveBullet = id => dispatch =>
  fetchBullet(id)
    .then(dispatchAction(dispatch, receiveBullet))

export const createTopicBullet = (topicId, bullet) => dispatch =>
  postTopicBullet(topicId, bullet)
    .then(dispatchAction(dispatch, receiveNewBullet))

export const createSubBullet = (parentId, bullet) => dispatch =>
  postSubBullet(parentId, bullet)
    .then(dispatchAction(dispatch, receiveNewBullet))

export const updateBullet = bullet => dispatch =>
  putBullet(bullet)
    .then(dispatchAction(dispatch, receiveBullet))

export const destroyBullet = id => dispatch =>
  deleteBullet(id)
    .then(dispatchAction(dispatch, removeBullet))
