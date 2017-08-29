import changeHandler from 'memoized-change-handler'
import React from 'react'

class TopicForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.topic || { title: '', }
    this.handleChange = changeHandler(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.topic ^ newProps.topic)
      this.setState(props.bullet)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.submit(this.state)
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit} >

        <input
          value={this.state.title}
          placeHolder={this.props.name}
          onChange={this.handleChange('title')}/>

      </form>)
  } 
}

export default TopicForm
