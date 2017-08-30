import changeHandler from 'memoized-change-handler'
import React from 'react'

class BulletForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = props.bullet ? props.bullet : { title: '', type: 'note' }
    this.handleChange = changeHandler(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.bullet ^ newProps.bullet)
      this.setState(props.bullet)
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.save(this.state)
  }

  render() {
    return (
      <div>
        <form 
          onSubmit={this.onSubmit} >

          <input
            value={this.state.title}
            placeholder={this.props.name}
            onChange={this.handleChange('title')}/>
        </form>

        <button onClick={e => {e.preventDefault(); this.props.delete(this.state)}}>
          x
        </button>
      </div>)
  }
}

export default BulletForm
