import { assoc, sort, values } from 'ramda'
import React from 'react'
import { connect } from 'react-redux' 

import {
  createSubBullet,
  updateBullet,
  destroyBullet,
  receiveBullet, removeBullet,
  setFocus,
} from '../actions'

import Bullets from './Bullets'

class BulletItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = props.bullet

    this.setInterval = this.setInterval.bind(this)
    this.clearInterval = this.clearInterval.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.createSubBullet = this.createSubBullet.bind(this)
    this.updateBullet = this.updateBullet.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    if (this.props.focused) {
      this.input.focus()
      this.input.setSelectionRange(
        this.props.focus.selectionStart, 
        this.props.focus.selectionEnd)
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.focused && this.props.focused) {
      this.input.focus()
      this.input.setSelectionRange(
        this.props.focus.selectionStart, 
        this.props.focus.selectionEnd)
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.focused && newProps.focused) {
      this.input.focus()
      this.input.setSelectionRange(
        this.props.focus.selectionStart, 
        this.props.focus.selectionEnd)
    }
    if (this.props.bullet.updatedAt !== newProps.bullet.updatedAt)
      this.setState(newProps.bullet)
  }

  handleChange(field) {
    return e => {
      e.preventDefault()

      this.setState(
        { [field]: e.target.value, },
        () => {
          this.props.setFocus(
            this.props.bullet.id, 
            this.input.selectionStart, this.input.selectionEnd)
        })
    } 
  }

  handleClick(e) {
    this.props.setFocus(this.props.bullet.id, this.input.selectionStart, this.input.selectionEnd)
  }

  setInterval() {
    this.intervalId = setInterval(this.updateBullet, 5000)
  }

  clearInterval() {
    clearInterval(this.intervalId)
    this.updateBullet()
  }

  newSiblingBullet() {
    const bullet = this.props.bullet

    return {
      ord: bullet.ord + 1,
      parent_id: bullet.parent_id,
      topic_id: bullet.topic_id,
      type: 'note',
      title: '',
    }
  }

  createNextBullet() {
    return this.props.createBullet(this.newSiblingBullet())
      .then(bullet => this.props.setFocus(bullet.id, 0, 0))
  }

  createSubBullet(bullet) {
    return this.props.createSubBullet(this.props.bullet.id, bullet)
  }

  updateBullet() {
    return this.props.updateBullet(this.state, this.props.bullet)
  }

  destroyBullet() {
    let focus = [null, null, null]
    const { parentBullet, prevBullet, nextBullet } = this.props
    
    if (prevBullet) {
      focus = [prevBullet.id, prevBullet.title.length - 1, prevBullet.title.length - 1]
    } else if (parentBullet) {
      focus = [parentBullet.id, parentBullet.title.length - 1, parentBullet.title.length - 1]
    } else if (nextBullet) {
      focus = [nextBullet.id, nextBullet.title.length - 1, nextBullet.title.length - 1]
    }
     
    return this.props.destroyBullet(this.props.bullet.id)
      .then(() => focus ? this.props.setFocus(...focus) : null)
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
        e.preventDefault()
        e.stopPropagation()
        if (this.props.bullet.ord !== 1)
          this.indentBullet()
        break

      case 'Enter':
        e.preventDefault()
        e.stopPropagation()
        this.createNextBullet()
        break

      case 'Backspace':
        if (this.state.title === '')
          this.destroyBullet()
        break

      case 'Shift+Tab':
        e.preventDefault()
        e.stopPropagation()
        this.outdentBullet()
        break
      
      case 'ArrowRight':
      case 'ArrowLeft':
        this.props.setFocus(this.props.bullet.id, e.target.selectionStart, e.target.selectionEnd)
        break
    }
  }

  render() {
    const bullet = this.props.bullet

    return (
      <li>

        <div className='bullet'>
          <i className="fa fa-circle" aria-hidden="true"></i>

          <form 
            onKeyDown={this.handleKeyPress}>

            <input
              value={this.state.title || ''}
              placeholder={this.props.name}
              ref={input => this.input = input}
              onChange={this.handleChange('title')}
              onClick={this.handleClick}
              onFocus={this.setInterval}
              onBlur={this.removeInterval}/>

          </form>
        </div>

        <Bullets
          bullet_ids={bullet.child_ids} 
          createBullet={this.createSubBullet} />

      </li>
    )
  }
}

const mapStateToProps = ({ entities: { bullets }, joins: { subBullets }, ui }, ownProps) => {
  const bullet = bullets[ownProps.bullet_id]

  return {
    bullet: assoc('child_ids', subBullets[bullet.id] || [], bullet),
    parentBullet: bullet.parent_id ? assoc('child_ids', subBullets[bullet.parent_id] || [], bullets[bullet.parent_id]) : null,
    prevBullet: ownProps.prevId ? assoc('child_ids', subBullets[ownProps.prevId] || [], bullets[ownProps.prevId]) : null,
    nextBullet: ownProps.nextId ? assoc('child_ids', subBullets[ownProps.nextId] || [], bullets[ownProps.nextId]) : null,
    focused: ui.focus.id === ownProps.bullet_id,
    focus: ui.focus,
  }
}

const mapDispatchToProps = {
  createSubBullet,
  updateBullet,
  destroyBullet,
  receiveBullet,
  removeBullet,
  setFocus,
}

const ConnectedBulletItem = connect(mapStateToProps, mapDispatchToProps)(BulletItem)
ConnectedBulletItem.displayName = ConnectedBulletItem

export default ConnectedBulletItem
