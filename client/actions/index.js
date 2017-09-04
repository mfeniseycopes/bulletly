import { 
  fetchTopics, 
  fetchTopicBullets,
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
  RECEIVE_BULLETS,
  REMOVE_BULLET,
  RECEIVE_TOPIC,
  RECEIVE_TOPICS,
  REMOVE_TOPIC,
  SET_FOCUS,
] = [
  'RECEIVE_BULLET',
  'RECEIVE_BULLETS',
  'REMOVE_BULLET',
  'RECEIVE_TOPIC',
  'RECEIVE_TOPICS',
  'SET_FOCUS',
]

// ACTION CREATORS

export const receiveTopic = topic => ({
  type: RECEIVE_TOPIC,
  payload: { topic },
})

export const receiveTopics = topics => ({
  type: RECEIVE_TOPICS,
  payload: { topics },
})

export const removeTopic = topic => ({
  type: REMOVE_TOPIC,
  payload: { topic },
})

export const receiveBullet = (bullet, oldBullet=null) => ({
  type: RECEIVE_BULLET,
  payload: { bullet, oldBullet },
})

export const receiveBullets = bullets => ({
  type: RECEIVE_BULLETS,
  payload: { bullets },
})

export const removeBullet = bullet => ({
  type: REMOVE_BULLET,
  payload: { bullet }
})

export const setFocus = (id, startSelection, endSelection) => ({
  type: SET_FOCUS,
  payload: {
    id,
    startSelection,
    endSelection,
  }
})
// TOPIC THUNKS

export const retrieveTopics = () => dispatch =>
  fetchTopics()
    .then(dispatchAction(dispatch, receiveTopics))

export const retrieveTopicBullets = id => dispatch =>
  fetchTopicBullets(id)
    .then(dispatchAction(dispatch, receiveBullets))

export const createTopic = topic => dispatch =>
  postTopic(topic)
    .then(dispatchAction(dispatch, receiveTopic))

export const updateTopic = topic => dispatch =>
  putTopic(topic)
    .then(dispatchAction(dispatch, receiveTopic))

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
    .then(dispatchAction(dispatch, receiveBullet))

export const createSubBullet = (parentId, bullet) => dispatch =>
  postSubBullet(parentId, bullet)
    .then(dispatchAction(dispatch, receiveBullet))

export const updateBullet = (bullet, oldBullet) => dispatch =>
  putBullet(bullet)
    .then(b => dispatch(receiveBullet(b, oldBullet)))

export const destroyBullet = id => dispatch =>
  deleteBullet(id)
    .then(dispatchAction(dispatch, removeBullet))
