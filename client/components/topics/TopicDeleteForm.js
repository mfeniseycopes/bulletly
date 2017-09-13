import React from 'react'
import { connect } from 'react-redux'

import { destroyTopic } from 'Actions'

import topicForm from 'Styles/topic-form.scss'

class TopicDeleteForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = props.topic ? {...props.topic} : { title: '' }
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleCancel(e) {
    e.preventDefault()
    this.props.history.goBack()
  }

  handleSubmit(e) {
    e.preventDefault()

    const topic = this.state;

    this.props.destroyTopic(topic.id)
      .then(t => this.props.history.replace(`/`))
  }

  label() {
    return this.props.topic ? 'Edit topic' : 'Create a topic'
  }

  render() {
    return (
      <form
        className='topic-form topic-delete-form'
        onSubmit={this.handleSubmit}>

        <label id='topic-title-label'>
          Are you sure you want to delete this topic? You will lose all associated bullets.
        </label>

        <div className='topic-form-button-container'>
          <button
            className='button'
            onClick={this.handleCancel} >
            Cancel
          </button>
          <button
            className='button delete-button'>
            Delete
          </button>
        </div>

      </form>)
  }
}

const mapStateToProps = ({ entities: {topics} }, ownProps) => ({
  topic: topics[ownProps.match.params.topicId] || null,
})

const mapDispatchToProps = {
  destroyTopic,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicDeleteForm)
