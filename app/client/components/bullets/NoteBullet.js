import React from 'react'

import BaseBullet from 'Components/bullets/BaseBullet'

class NoteBullet extends BaseBullet {

  constructor(props) {
    super(props)
    this.state.dateFloater = false
  }

  symbol() {
    return <i className="fa fa-circle symbol" aria-hidden="true"></i>
  }

  render() {
    return this.protoRender()
  }
}

export default NoteBullet
