import React from 'react'
import { connect } from 'react-redux'
import { merge } from 'ramda'

class Fetcher extends React.Component {

  componentDidMount() {
    this.props.dispatch(this.props.action(this.props.arg))
  }

  componentWillReceiveProps(newProps) {
    if (this.props.arg !== newProps.arg) 
      this.props.dispatch(this.props.action(newProps.arg))
  }

  render() {
    const {action, args, dispatch, component: Component, ...props} = this.props
    return <Component {...props} /> 
  }
}

const DispatchingFetcher = connect(null, dispatch => ({ dispatch }) )(Fetcher)

DispatchingFetcher.displayName = 'DispatchingFetcher'

const fetchable = (action, arg, component) => 
  (props => <DispatchingFetcher 
    { ...merge(props, {action, arg, component}) }/>)

export default fetchable

