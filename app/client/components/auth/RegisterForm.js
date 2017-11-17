import React from 'react'
import changeHandler from 'memoized-change-handler'
import { connect } from 'react-redux'

import { register } from 'Actions'

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '' }
    this.handleChange = changeHandler(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    debugger
    const user = { ...(this.state) }
    this.props.register(user)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          <li>
            <label>Email
              <input type='text' 
                value={this.state.email}
                onChange={this.handleChange('email')} />
            </label>
          </li>
          <li>
            <label>Password
              <input type='password' 
                value={this.state.password}
                onChange={this.handleChange('password')} />
            </label>
          </li>
          <li>
            <button type='submit'>Register</button>
          </li>
        </ul>
      </form>
    )
  }
}
const mapDispatchToProps = {
  register,
}

export default connect(null, mapDispatchToProps)(RegisterForm)
