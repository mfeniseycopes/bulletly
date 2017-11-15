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
  postRegister,
  postLogin,
  deleteLogout,
} from 'APIs'

const identity = x => x

const dispatchAction = (dispatch, action) => payload => {
  dispatch(action(payload))
  return payload
}

export const [
  RECEIVE_BULLET,
  RECEIVE_BULLETS,
  REMOVE_BULLET,
  RECEIVE_TOPIC,
  RECEIVE_TOPICS,
  REMOVE_TOPIC,
  SET_FOCUS,
  RECEIVE_CURRENT_USER,
] = [
  'RECEIVE_BULLET',
  'RECEIVE_BULLETS',
  'REMOVE_BULLET',
  'RECEIVE_TOPIC',
  'RECEIVE_TOPICS',
  'REMOVE_TOPIC',
  'SET_FOCUS',
  'RECEIVE_CURRENT_USER',
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

export const setFocus = (id, line, ch) => ({
  type: SET_FOCUS,
  payload: {
    id,
    line,
    ch,
  }
})

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  payload: { user }
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
    .then(b => {
      dispatch(receiveBullet(b, oldBullet))
      return b
    })

export const destroyBullet = id => dispatch =>
  deleteBullet(id)
    .then(dispatchAction(dispatch, removeBullet))

// AUTH THUNKS

export const register = user =>
  register(user)
    .then(dispatchAction(dispatch, receiveCurrentUser))

export const login = user =>
  login(user)
    .then(dispatchAction(dispatch, receiveCurrentUser))

export const logout = () =>
  logout()
    .then(dispatchAction(dispatch, receiveCurrentUser))
