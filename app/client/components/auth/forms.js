import React from 'react'
import changeHandler from 'memoized-change-handler'
import { connect } from 'react-redux'

import { login, register } from 'Actions'

class AuthForm extends React.Component {
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
    this.props.formAction(user)
      .then(() => this.props.history.replace('/'))
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
            <button type='submit'>{this.props.buttonText}</button>
          </li>
        </ul>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch, {formAction}) => ({
  formAction: user => dispatch(formAction(user)),
})

const ConnectedAuthForm = connect(null, mapDispatchToProps)(AuthForm)

export const RegisterForm = props => (
  <ConnectedAuthForm {...props} 
    formAction={register} 
    buttonText='Register' />
)

export const LoginForm = props => (
  <ConnectedAuthForm {...props} 
    formAction={login}
    buttonText='Login' />
)

