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
} from '../actions'

import Bullets from './Bullets'

class BulletItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = props.bullet

    this.handleChange = changeHandler(this)
    this.createNextBullet = this.createNextBullet.bind(this)
    this.updateBullet = this.updateBullet.bind(this)
    this.destroyBullet = this.destroyBullet.bind(this)
    this.indentBullet = this.indentBullet.bind(this)
    this.outdentBullet = this.outdentBullet.bind(this)
    this.createSubBullet = this.createSubBullet.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
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

  updateBullet() {
    this.props.updateBullet(this.state, this.props.bullet)
  }

  destroyBullet(e) {
    e.preventDefault()

    return this.props.destroyBullet(this.props.bullet.id)
  }

  indentBullet() {
    const { prevId, prevBullet } = this.props
    const bullet = this.state
  
    const shiftedBullet = {
      ...bullet, 
      ord: prevBullet.child_ids.length + 1,
      parent_id: prevBullet.id, 
    }
    return this.props.updateBullet(shiftedBullet, bullet)
  }

  outdentBullet() {
    const { parentBullet } = this.props
    const bullet = this.state

    const shiftedBullet = {
      ...bullet,
      ord: parentBullet.ord + 1,
      parent_id: parentBullet.parent_id,
    }
    
    return this.props.updateBullet(shiftedBullet, bullet)
  }

  handleKeyPress(e) {
    const shift = e.shiftKey ? 'Shift+' : ''
    const keyCombo = shift + e.key

    switch(keyCombo) {
      case 'Tab':
        if (this.props.bullet.ord !== 1) {
          e.preventDefault()
          e.stopPropagation()
          this.indentBullet(e)
          break
        }

      case 'Enter':
        e.preventDefault()
        e.stopPropagation()
        this.createNextBullet()
        break

      case 'Backspace':
        if (this.state.title === '') {
          e.preventDefault()
          e.stopPropagation()
          this.destroyBullet(e)
          break
        }

      case 'Shift+Tab':
        e.preventDefault()
        e.stopPropagation()
        this.outdentBullet(e)
        break
    }
  }

  render() {
    const { 
      createSubBullet, 
      updateBullet, 
      destroyBullet, 
      indentBullet,
      outdentBullet,
    } = this

    const bullet = this.props.bullet

    return (
      <li>

        <div className='bullet'>
          <i className="fa fa-circle" aria-hidden="true"></i>


          <form 
            onBlur={updateBullet}
            onKeyDown={this.handleKeyPress}>

            <input
              value={this.state.title || ''}
              placeholder={this.props.name}
              onChange={this.handleChange('title')}/>

          </form>
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
