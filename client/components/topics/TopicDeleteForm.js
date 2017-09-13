import React from 'react'
import { connect } from 'react-redux'

import { destroyTopic } from '../../actions'

import topicForm from '../../styles/topic-form.scss'

class TopicDeleteForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = props.topic ? {...props.topic} : { title: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
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
        className='topic-form'
        onSubmit={this.handleSubmit}>

        <label id='topic-title-label'>
          Are you sure you want to delete this topic? You will lose all associated bullets.
        </label>

        <div className='topic-form-button-container'>
          <button className='button'>Cancel</button>
          <button className='button'>Delete</button>
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
