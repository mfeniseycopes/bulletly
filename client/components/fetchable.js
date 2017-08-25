import React from 'react'
import { connect } from 'react-redux'

class Fetcher extends React.Component {

  componentDidMount() {
    debugger
    this.props.dispatch(this.props.action(this.props.arg))
  }

  componentWillReceiveProps(newProps) {
    if (this.props.arg !== newProps.arg) 
      this.props.dispatch(this.props.action(newProps.arg))
  }

  render() {
    const { action, args, dispatch, component: Component, ...props } = this.props
    debugger
    return <Component {...props} /> 
  }
}

export default (action, arg) => (component) => connect(null, dispatch => ({ dispatch }))
  (props => <Fetcher action={action} arg={arg} component={component} {...(props)} />)
