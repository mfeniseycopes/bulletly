import React from 'react'
import { withRouter, Link, Route } from 'react-router-dom'

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
    <Link className='modal-background'
      to={`${props.match.params[0]}`}>
      <div className='modal-container'
        onClick={e => e.preventDefault()}>
        <Component {...props} />
      </div>
    </Link>)
}

export default withRouter(ModalRoute)
