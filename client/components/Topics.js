import React from 'react'

const topicLi = topic => (
  <li key={topic.id}>{topic.title}</li>
)

const Topics = ({ topics }) => (
  <ul>
    { topics.map(topicLi) }
  </ul>
)

export default Topics
