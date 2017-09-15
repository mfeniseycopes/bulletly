import React from 'react'
import { withRouter, Link, Redirect, Route } from 'react-router-dom'

import modal from 'Styles/modal.scss'

export const ModalLink = ({to, children}) => (
  <Link to={{pathname: to, state: {modal: true}}}>
    {children}
  </Link>
)

const modalize = component => props => {
  const Component = component
  const { history, location } = props

  const onOuterClick = e => {
    history.goBack()
  }

  const onInnerClick = e => {
    e.stopPropagation()
  }

  if (history.action === 'POP' || !location.state || !location.state.modal)
    return <Redirect to='/'/>

  return (
    <div className='modal-background' onClick={onOuterClick}>
      <div className='modal-container' onClick={onInnerClick}>
        <Component {...props}/>
      </div>
    </div>)
}

export const ModalRoute = withRouter(props =>
  <Route {...props} component={modalize(props.component)}/>)
