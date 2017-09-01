import changeHandler from 'memoized-change-handler'
import { assoc, sort, values } from 'ramda'
import React from 'react'
import { connect } from 'react-redux' 

import {
  createSubBullet,
  updateBullet,
  destroyBullet,
  receiveBullet,
  removeBullet,
  shiftBulletOrds,
} from '../actions'

import Bullets from './Bullets'

class BulletItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = props.bullet

    this.handleChange = changeHandler(this)
    this.createNextBullet = this.createNextBullet.bind(this)
    this.destroyBullet = this.destroyBullet.bind(this)
    this.indentBullet = this.indentBullet.bind(this)
    this.updateBullet = this.updateBullet.bind(this)
    this.createSubBullet = this.createSubBullet.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.bullet.updatedAt !== newProps.bullet.updatedAt)
      this.setState(newProps.bullet)
  }

  newSiblingBullet() {
    const bullet = this.props.bullet

    return {
      ord: bullet.ord + 1,
      parent_id: bullet.parent_id,
      topic_id: bullet.topic_id,
      type: 'note',
    }
  }

  createNextBullet() {
    return this.props.createBullet(this.newSiblingBullet())
  }

  createSubBullet(bullet) {
    return this.props.createSubBullet(this.props.bullet.id, bullet)
  }

  updateBullet(e) {
    e.preventDefault()
    
    this.props.updateBullet(this.state, this.props.bullet)
      .then(this.createNextBullet)
  }

  destroyBullet(e) {
    e.preventDefault()

    return this.props.destroyBullet(this.props.bullet.id)
  }

  indentBullet(e) {
    e.preventDefault()

    const { bullet, prevId, prevBullet } = this.props
  
    const shiftedBullet = {
      ...bullet, 
      ord: prevBullet.child_ids.length + 1,
      parent_id: prevBullet.id, 
    }

    return this.props.updateBullet(shiftedBullet, bullet)
  }

  outdentBullet(e) {
    e.preventDefault()

    const { bullet, parentBullet } = this.props

    const shiftedBullet = {
      ...bullet,
      ord: parentBullet.ord + 1,
      parent_id: parentBullet.parent_id,
    }
    
    return this.props.updateBullet(shiftedBullet, bullet)
  }

  render() {
    const { 
      createSubBullet, 
      updateBullet, 
      destroyBullet, 
      indentBullet,
    } = this

    const bullet = this.props.bullet

    return (
      <li>

        <div className='bullet'>
          <i className="fa fa-circle" aria-hidden="true"></i>


          <form 
            onSubmit={updateBullet} >

            <input
              value={this.state.title || ''}
              placeholder={this.props.name}
              onChange={this.handleChange('title')}/>

          </form>

          { bullet.ord !== 1 ? 
            <button onClick={indentBullet}>➡️</button> : 
            null }
          <button onClick={destroyBullet}>❎</button>
        </div>

        <Bullets
          bullet_ids={bullet.child_ids} 
          createBullet={createSubBullet} />

      </li>
    )
  }
}

const mapStateToProps = ({ entities: { bullets }, joins: { subBullets }}, ownProps) => {
  const bullet = bullets[ownProps.bullet_id]
  return {
    bullet: assoc('child_ids', subBullets[bullet.id] || [], bullet),
    parentBullet: assoc('child_ids', subBullets[bullet.parent_id] || [], bullets[bullet.parent_id]),
    prevBullet: assoc('child_ids', subBullets[ownProps.prevId] || [], bullets[ownProps.prevId]),
  }
}

const mapDispatchToProps = {
  createSubBullet,
  updateBullet,
  destroyBullet,
  receiveBullet,
  removeBullet,
}

const ConnectedBulletItem = connect(mapStateToProps, mapDispatchToProps)(BulletItem)
ConnectedBulletItem.displayName = ConnectedBulletItem

export default ConnectedBulletItem
