import React from 'react'

import BaseBullet from './BaseBullet'

class TaskBullet extends BaseBullet {

  constructor(props) {
    super(props)
  }

  symbol() {
    const className = this.state.completed_on ?
      'fa fa-check-square-o symbol' : 'fa fa-square-o symbol'

    return <i className={className} aria-hidden="true"></i>
  }

  render() {
    return this.protoRender()
  }
}

export default TaskBullet
