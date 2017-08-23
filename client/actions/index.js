export const {
  RECEIVE_SINGLE_BULLET,
  RECEIVE_SINGLE_TOPIC,
  RECEIVE_MULTIPLE_TOPICS,
} = {
  'RECEIVE_SINGLE_BULLET',
  'RECEIVE_SINGLE_TOPIC',
  'RECEIVE_MULTIPLE_TOPICS',
}

export const receiveMultipleTopics = topics = ({
  type: RECEIVE_MULTIPLE_TOPICS,
  payload: { topics }
})

export const receiveSingleTopic = topic => ({
  type: RECEIVE_SINGLE_TOPIC,
  payload: { topic, bullets: topic.bullets },
})

export const receiveSingleBullet = bullet => ({
  type: RECEIVE_SINGLE_BULLET,
  payload: { bullet }
})
