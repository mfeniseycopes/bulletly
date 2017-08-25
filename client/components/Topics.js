import React from 'react'
import { 
  connect 
} from 'react-redux'
import { 
  clone,
  values,
} from 'ramda'
import changeHandler from 'memoized-change-handler'

import {
  retrieveTopics,
  createTopic,
  updateTopic,
  destroyTopic,
} from '../actions'

import fetchable from './fetchable'

class TopicItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = clone(props.topic)
    this.handleChange = changeHandler(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.topic)
  }

  render() {
    const { topic, updateTopic, destroyTopic } = this.props

    return ( 
    <li>
      <form 
        onSubmit={ e => { e.preventDefault(); updateTopic(this.state)  }} >
        <input
          value={this.state.title}
          placeholder='Rename Topic' 
          onChange={this.handleChange('title')}/>
      </form>
      <button
        onClick={() => destroyTopic(topic.id) }
        title='delete'>
       ╳ 
      </button>
    </li>
  )
  }
}

const submitTopicItemForm = createTopic => e => {
  e.preventDefault()
  createTopic({ title: e.target.firstElementChild.value })
}

const TopicItemForm = ({createTopic}) => (
  <li key={0}>
    <form 
      onSubmit={submitTopicItemForm(createTopic)} >
      <input 
        placeholder='New Topic' />
    </form>
  </li>
)

const Topics = ({topics, retrieveTopics, createTopic, updateTopic, destroyTopic}) => (
  <section>
    <ul>

      {topics.map(topic => (
        <TopicItem key={topic.id} {...{topic, updateTopic, destroyTopic}} />
      ))}

      <TopicItemForm {...{createTopic}} />

    </ul>
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

export default 
  fetchable(retrieveTopics, null, connect(mapStateToProps, mapDispatchToProps)(Topics))
