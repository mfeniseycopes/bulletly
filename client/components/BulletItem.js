import { values } from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import {
  createSubBullet,
  createNextBullet,
  updateBullet,
  destroyBullet,
  receiveBullet,
  removeBullet,
} from '../actions'

import BulletForm from './BulletForm'
import Bullets from './Bullets'

let _tempId = -1

class BulletItem extends React.Component {

  constructor(props) {
    super(props)
    this.saveBullet = this.saveBullet.bind(this)
    this.destroyBullet = this.destroyBullet.bind(this)
    this.createSubBullet = this.createSubBullet.bind(this)
    this.createNextBullet = this.createNextBullet.bind(this)
    this.receiveStubBullet = this.receiveStubBullet.bind(this)
  }

  createSubBullet(bullet) {
    return this.props.createSubBullet(this.props.bullet.id, bullet)
  }

  createNextBullet(prevId) {
    return bullet => {
      bullet.parent_id = this.props.bullet.id
      return this.props.createNextBullet(prevId, bullet)
    }
  }

  receiveStubBullet() {
    return this.props.receiveBullet({ 
      id: _tempId,
      title: '', 
      type: 'note', 
      parent_id: this.props.bullet.parent_id,
      topic_id: this.props.bullet.topic_id,
    })
  }

  saveBullet(bullet) {
    if (bullet.id > 0) {
      this.props.updateBullet(bullet)
        .then(this.receiveStubBullet)
    } else {
      const { id, ...submittableBullet } = bullet
      this.props.createBullet(submittableBullet)
        .then(() => this.props.removeBullet(bullet))
        .then(this.receiveStubBullet)
    }
  }

  destroyBullet(bullet) {
    (bullet.id > 0 ?
      this.props.destroyBullet(bullet.id) :
      this.props.removeBullet(bullet))
  }

  render() {
    const { createSubBullet, createNextBullet, saveBullet, destroyBullet } = this
    const bullet = this.props.bullet
    
    return (
      <li>

        <div className='bullet'>
          <i className="fa fa-circle" aria-hidden="true"></i>

          <BulletForm 
            bullet={bullet}
            save={saveBullet}
            delete={destroyBullet}
            name={bullet.id > 0 ? 'Update Bullet' : 'New Bullet'}/>

        </div>

        <Bullets
          bullet_ids={this.props.child_ids} 
          createFirstBullet={createSubBullet}
          createNextBullet={createNextBullet} />

      </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  bullet: state.entities.bullets[ownProps.bullet_id],
  child_ids: values(state.joins.subBullets[ownProps.bullet_id])
})

const mapDispatchToProps = {
  createSubBullet,
  createNextBullet,
  updateBullet,
  destroyBullet,
  receiveBullet,
  removeBullet,
}

const ConnectedBulletItem = connect(mapStateToProps, mapDispatchToProps)(BulletItem)
ConnectedBulletItem.displayName = ConnectedBulletItem

export default ConnectedBulletItem
