import React from 'react'
import changeHandler from 'memoized-change-handler'
import { connect } from 'react-redux'

import { createTopic } from '../actions'

class TopicForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = props.topic || { title: '' }
    this.handleChange = changeHandler(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    let p = this.props.createTopic(this.state)
    debugger
    p.then(topic => this.props.history.push(`/topic/${topic.id}`))
  }

  render() {
    return (
      <form>
        <input type='text' 
          value={this.state.title} 
          onChange={this.handleChange('title')}/>
        <button type='submit' onClick={this.handleSubmit}>Submit</button>
      </form>)
  }
}

const mapDispatchToProps = {
  createTopic,
}

export default connect(null, mapDispatchToProps)(TopicForm)
