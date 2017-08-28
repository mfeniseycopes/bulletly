import changeHandler from 'memoized-change-handler'
import { values } from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import {
  createSubBullet,
  updateBullet,
  destroyBullet,
} from '../actions'

import BulletForm from './BulletForm'
import Bullets from './Bullets'

class BulletItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {...(this.props.bullet)} 
    this.handleChange = changeHandler(this)
    this.createSubBullet = this.createSubBullet.bind(this)
    this.updateBullet = this.updateBullet.bind(this)
    this.destroyBullet = this.destroyBullet.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.bullet)
  }

  createSubBullet(newBullet) {
    this.props.createSubBullet(this.props.bullet.id, newBullet)
  }

  updateBullet(e) {
    e.preventDefault()
    this.props.updateBullet(this.state)
  }

  destroyBullet(e) {
    e.preventDefault()
    this.props.destroyBullet(this.props.bullet.id)
  }

  render() {

    const { bullet, updateBullet, destroyBullet } = this.props
    
    return (
      <li>

        <BulletForm 
          bullet={bullet}
          submit={updateBullet}
          name='Rename Bullet' />

        <button
          onClick={this.destroyBullet}
          title='delete'>
          ╳ 
        </button>

        <Bullets 
          bullet_ids={this.props.child_ids} 
          submit={this.createSubBullet} />
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
  updateBullet,
  destroyBullet,
}

const ConnectedBulletItem = connect(mapStateToProps, mapDispatchToProps)(BulletItem)
ConnectedBulletItem.displayName = ConnectedBulletItem

export default ConnectedBulletItem
