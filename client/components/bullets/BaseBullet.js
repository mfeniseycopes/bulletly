import React from 'react'

import Bullets from '../Bullets'

class BaseBullet extends React.Component {

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
    this.props.setFocus(
      this.props.bullet.id,
      this.input.selectionStart,
      this.input.selectionEnd)
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

  newSubBullet(type=this.props.bullet.type) {
    const bullet = this.props.bullet

    return {
      ord: 1,
      parent_id: bullet.id,
      topic_id: bullet.topic_id,
      type,
      title: '',
    }
  }

  createNextBullet(type) {
    return this.props.createBullet(this.newSiblingBullet(type))
      .then(bullet => this.props.setFocus(bullet.id, 0, 0))
  }

  createSubBullet(bullet = this.newSubBullet()) {
    return this.props.createSubBullet(this.props.bullet.id, bullet)
      .then(subBullet => this.props.setFocus(subBullet.id, 0, 0))
  }

  updateBullet(e) {
    if (e) e.preventDefault()

    if (this.props.bullet.title !== this.state.title ||
        this.props.bullet.due_date !== this.state.due_date) {
      return this.props.updateBullet(this.state, this.props.bullet)
    }
    return Promise.resolve()
  }

  destroyBullet() {
    let focus = [null, null, null]
    const { parentBullet, prevBullet, nextBullet } = this.props

    if (prevBullet) {
      focus = [prevBullet.id, prevBullet.title.length, prevBullet.title.length]
    } else if (parentBullet) {
      focus = [parentBullet.id, parentBullet.title.length, parentBullet.title.length]
    } else if (nextBullet) {
      focus = [nextBullet.id, 0, 0]
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
    const keyCombo = ctrl + shift + e.key

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
        if (this.props.bullet.child_ids.length > 0) {
          this.updateBullet(e)
            .then(this.createSubBullet.bind(this))
        } else {
          this.updateBullet(e)
            .then(this.createNextBullet.bind(this))
        }
        break

      // make event
      case 'Control+e':
        this.updateBullet(e)
          .then(() => this.createNextBullet('event'))
        break

      // make note
      case 'Control+n':
        this.updateBullet(e)
          .then(() => this.createNextBullet('note'))
        break

      // make task
      case 'Control+t':
        this.updateBullet(e)
          .then(() => this.createNextBullet('task'))
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
    throw 'Sub-classes of BulletItem must provide a symbol method'
  }

  protoRender(preForm, postForm) {
    const {dateFloater, due_date, title, type} = this.state
    const { child_ids } = this.props.bullet

    return (
      <li>

        <div className='bullet'>
          {this.symbol()}

          {preForm}

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

          {postForm}

        </div>

        <Bullets
          bullet_ids={child_ids}
          createBullet={this.createSubBullet} />

      </li>
    )
  }

  render() {
    throw 'Sub-classes of BulletItem must provide a render method'
  }
}

export default BaseBullet
