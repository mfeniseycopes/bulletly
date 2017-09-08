import { assoc, sort, values } from 'ramda'
import React from 'react' 
import { connect } from 'react-redux' 
import moment from 'moment'
import Datetime from 'react-datetime'

import { 
  createSubBullet,
  updateBullet,
  destroyBullet,
  receiveBullet, 
  removeBullet,
  setFocus,
} from '../actions'

import Bullets from './Bullets'

import datetime from '../styles/datetime.scss'

class BulletItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {...props.bullet}

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
        newProps.focus.selectionStart, 
        newProps.focus.selectionEnd)
    }
    if (this.props.bullet.updatedAt !== newProps.bullet.updatedAt) {
      this.setState({...newProps.bullet})
    }
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
    this.intervalId = setInterval(this.updateBullet, 1000)
  }

  clearInterval() {
    clearInterval(this.intervalId)
  }

  newSiblingBullet(type=this.props.bullet.type) {
    const bullet = this.props.bullet

    return {
      ord: bullet.ord + 1,
      parent_id: bullet.parent_id,
      topic_id: bullet.topic_id,
      type,
      title: '',
    }
  }

  createNextBullet(type) {
    return this.props.createBullet(this.newSiblingBullet(type))
      .then(bullet => this.props.setFocus(bullet.id, 0, 0))
  }

  createSubBullet(bullet) {
    return this.props.createSubBullet(this.props.bullet.id, bullet)
  }

  updateBullet(e) {
    if (e) e.preventDefault()

    if (this.props.bullet.title !== this.state.title ||
        this.props.bullet.due_date !== this.state.due_date)
      return this.props.updateBullet(this.state, this.props.bullet)
    return Promise.resolve()
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
    const { parentBullet, prevBullet } = this.props
    const bullet = this.state
    
    const shiftedBullet = {
      ...bullet,
      ord: parentBullet.ord + 1,
      parent_id: parentBullet.parent_id,
    }
    
    return this.props.updateBullet(shiftedBullet, bullet)
  }

  handleKeyPress(e) {
    const ctrl = e.ctrlKey ? 'Control+' : ''
    const shift = e.shiftKey ? 'Shift+' : ''
    const meta = e.metaKey ? 'Meta+' : ''
    const keyCombo = ctrl + shift + meta + e.key
    
    switch(keyCombo) {
      // indent
      case 'Tab':
        e.preventDefault()
        e.stopPropagation()
        if (this.props.bullet.ord !== 1)
          this.indentBullet()
        break

      // create and go to sibling bullet
      case 'Enter':
        e.preventDefault()
        this.updateBullet()
          .then(this.createNextBullet.bind(this))
        break

      // make event
      case 'Meta+e':
        this.setState({type: 'event'})
        break
      
      // make note
      case 'Meta+n':
        this.setState({type: 'note'})
        break

      // make task
      case 'Meta+c':
        this.setState({type: 'task'})
        break

      // delete
      case 'Backspace':
        if (this.state.title === '')
          this.destroyBullet()
        break

      // outdent
      case 'Shift+Tab':
        e.preventDefault()
        e.stopPropagation()
        this.outdentBullet()
        break

      // add/edit due date
      case 'Control+d':
        this.setState({dateFloater: true})
        debugger
        break

      // move cursor
      case 'ArrowRight':
      case 'ArrowLeft':
        this.props.setFocus(this.props.bullet.id, e.target.selectionStart, e.target.selectionEnd)
        break
      
      // move cursor to previous bullet
      case 'ArrowUp':
        e.preventDefault()
        const prev = this.props.prevBullet || this.props.parentBullet
        if (prev) this.props.setFocus(prev.id, prev.title.length, prev.title.length)
        break

      // move cursor to next bullet
      case 'ArrowDown':
        e.preventDefault()
        const next = this.props.nextBullet
        if (next) this.props.setFocus(next.id, 0, 0)
        break
    }
  }

  symbol() {
    const bullet = this.state
    let className

    switch(bullet.type) {
      case 'note': 
        return (<i className="fa fa-circle" aria-hidden="true"></i>)

      case 'event': 
        className = 'fa fa-circle-o' 
        return (<i className={className} aria-hidden="true"></i>)

      case 'task':
        className = this.state.completed_on ? 
          'fa fa-check-square-o' : 'fa fa-square-o'
        return (<i className={className} aria-hidden="true"></i>)
    }
  }

  render() {
    const {child_ids, dateFloater, due_date, title, type} = this.state
    
    let date = null
    if (dateFloater) {

      const dateOnBlur = () =>
        this.updateBullet()
          .then(() => this.setState({dateFloater: false}))
      const dateOnChange = e => this.setState({due_date: e.toISOString()})
        
      date = (
        <Datetime
          inputProps={{placeholder: 'cal', autoFocus: true}}
          value={moment(due_date)}
          format='MM/DD/YY hh:mm'
          onChange={dateOnChange}
          onBlur={dateOnBlur}/>
      )
    } else {

      const dateOnChange = e => this.setState({dateFloater: true})

      date = <button className='bullet-date' onClick={dateOnChange}> 
        {due_date ? moment(due_date).format('HH/DD/YY h:mm') : 'cal'}
      </button>
    }


    return (
      <li>

        <div className='bullet'>
          {this.symbol()}

          {type !== 'note' ? date : null}

          <form
            className='bullet-form'
            onSubmit={this.updateBullet}
            onKeyDown={this.handleKeyPress}>

              <input
                type='text'
                value={title || ''}
                placeholder={this.props.name}
                ref={input => this.input = input}
                onChange={this.handleChange('title')}
                onClick={this.handleClick}
                onFocus={this.setInterval}
                onBlur={this.clearInterval}/>

          </form>

        </div>

        <Bullets
          bullet_ids={child_ids} 
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
