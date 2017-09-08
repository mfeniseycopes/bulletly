import React from 'react'

import BaseBullet from './BaseBullet'

class NoteBullet extends BaseBullet {

  constructor(props) {
    super(props)
    this.state.dateFloater = false
  }

  symbol() {
    return <i className="fa fa-circle" aria-hidden="true"></i>
  }

  render() {
    return this.protoRender()
  }
}

export default NoteBullet
