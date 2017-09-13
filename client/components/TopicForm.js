import React from 'react'
import changeHandler from 'memoized-change-handler'
import { connect } from 'react-redux'

import { createTopic, updateTopic } from '../actions'

import topicForm from '../styles/topic-form.scss'

class TopicForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = props.topic ? {...props.topic} : { title: '' }
    this.handleChange = changeHandler(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const titleLength = this.state.title.length
    this.input.focus()
    this.input.setSelectionRange(titleLength, titleLength)
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.topic && newProps.topic) {
      this.setState({...newProps.topic})
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    const topic = this.state;
    const crud = topic.id ? this.props.updateTopic : this.props.createTopic

    crud(topic)
      .then(t => this.props.history.replace(`/topic/${t.id}`))
  }

  label() {
    return this.props.topic ? 'Edit topic' : 'Create a topic'
  }

  render() {
    return (
      <form 
        className='topic-form'
        onSubmit={this.handleSubmit}>

        <label id='topic-title-label'>
          {this.label()}
        </label>

        <input 
          className='topic-title-input'
          ref={input => this.input = input}
          label='topic-title-label'
          type='text'
          value={this.state.title || ''}
          onChange={this.handleChange('title')} />

        <div className='topic-form-button-container'>
          <button className='button'>Submit</button>
        </div>

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
