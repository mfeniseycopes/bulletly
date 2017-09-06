import React from 'react'
import { withRouter, Route } from 'react-router-dom'

import modal from '../styles/modal.scss'

const ModalRoute = props => {
  const component = modalize(props.component)
  return (
    <Route {...props} component={component} />
  )
}

const modalize = component => props => {
  const Component = component 
  
  return (
    <div className='modal-background'
      onClick={e => e.preventDefault()}>
      <div className='modal-container'
        onClick={e => e.preventDefault()}>
        <Component {...props} />
      </div>
    </div>)
}

export default withRouter(ModalRoute)
