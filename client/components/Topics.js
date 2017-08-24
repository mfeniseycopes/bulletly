import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { values } from 'ramda'

import {
  retrieveTopics,
  createTopic,
  updateTopic,
  destroyTopic,
} from '../actions'

const topicLi = topic => (
  <li key={topic.id}>{topic.title}</li>
)

const Topics = ({ topics, retrieveTopics }) => (
  <section>
    <ul>
      { topics.map(topicLi) }
    </ul>
    <button onClick={retrieveTopics} >
      Fetch Topics
    </button>
  </section>
)

const mapStateToProps = (state, ownProps) => ({
  topics: values(state.entities.topics)
})

const mapDispatchToProps = {
  retrieveTopics,
  createTopic,
  updateTopic,
  destroyTopic,
}

export default connect(mapStateToProps, mapDispatchToProps)(Topics)
