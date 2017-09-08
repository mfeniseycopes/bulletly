import React from 'react'

import BaseBullet from './BaseBullet'
import datetime from '../../styles/datetime.scss'

class EventBullet extends BaseBullet {

  constructor(props) {
    super(props)
    this.state.dateFloater = false
  }

  symbol() {
    return <i className='fa fa-circle-o' aria-hidden="true"></i>
  }

  render() {
    return protoRender()
  }
}

export default EventBullet
