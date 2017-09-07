import React from 'react'
import changeHandler from 'memoized-change-handler'
import { connect } from 'react-redux'

import { createTopic, updateTopic } from '../actions'

class TopicForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {...(props.topic)} || { title: '' }
    this.handleChange = changeHandler(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.topic && newProps.topic){
      this.setState({...(newProps.topic)})
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const topic = this.state;

    const crud = topic.id ? this.props.updateTopic : this.props.createTopic
    
    crud(topic)
      .then(t => this.props.history.replace(`/topic/${t.id}`))
  }

  render() {
    return (
      <form >
        <input type='text' 
          value={this.state.title} 
          onChange={this.handleChange('title')}/>
        <button type='button'
         onClick={this.handleSubmit}>Submit</button>
      </form>)
  }
}

const mapStateToProps = ({ entities: {topics} }, ownProps) => ({
  topic: topics[ownProps.match.params.topicId] || null,
})

const mapDispatchToProps = {
  createTopic,
  updateTopic,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicForm)
