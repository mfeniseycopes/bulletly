import React from 'react'
import ReactDOM from 'react-dom'
import SimpleMDE from 'react-simplemde-editor'

import Bullets from 'Components/bullets/Bullets'
import simplemde from 'Styles/simplemde.scss'

class BaseBullet extends React.Component {

  constructor(props) {
    super(props)
    this.state = {...props.bullet}
    this.state.title = this.state.title || ''

    this.handleClick = this.handleClick.bind(this)
    this.createSubBullet = this.createSubBullet.bind(this)
    this.updateBullet = this.updateBullet.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    // prevent default `Enter`, 'Tab' keys event for codemirror editor
    // was buggily adding newlines, which should be prevented in main bullets
    this.codemirror.options.extraKeys.Enter = () => {}
    this.codemirror.options.extraKeys.Tab = () => {}

    // if this bullet is in focus
    // set the cursor in inner codemirror editor
    if (this.props.focused) {
      if (!this.codemirror.hasFocus()) {
        const {line, ch} = this.props.focus
        this.codemirror.focus()
        this.codemirror.setCursor(line, ch)
      }
    }
  }

  componentDidUpdate(prevProps) {
    // if an outside event has focused on the bullet
    // set the cursor in the inner codemirror editor
    if (!prevProps.focused && this.props.focused) {
      if (!this.codemirror.hasFocus()) {
        const {line, ch} = this.props.focus
        this.codemirror.focus()
        this.codemirror.setCursor(line, ch)
      }
    }
  }

  componentWillReceiveProps(newProps) {
    // update only if new bullet
    // state should be keeping track of any other relevant changes to
    // same bullet
    if (this.props.bullet.id !== newProps.bullet.id) {
      this.setState({...newProps.bullet})
    }
  }

  // clear update timeout
  componentWillUnmount() {
    clearTimeout(this.updateTimeoutId)
  }

  handleMarkdownChange(val) {
    // update state, then update focus
    this.setState(
      {title: val},
      () => {
        const {ch, line} = this.codemirror.getCursor()
        this.props.setFocus(this.props.bullet.id, line, ch)
      })

    // set bullet to update later
    if (!this.updateTimeoutId)
     this.updateTimeoutId = setTimeout(this.updateBullet, 10)
  }

  handleChange(field) {
    return e => {
      e.preventDefault()
      this.setState({ [field]: e.target.value, })
    }
  }

  handleClick(e) {
    // clicks move the cursor automatically, but focus should update
    const {line, ch} = this.codemirror.getCursor()
    this.props.setFocus(this.props.bullet.id, line, ch)
  }

  // helper to create new bullet with same parent and ord + 1
  newSiblingBullet(type=this.props.bullet.type) {
    const bullet = this.props.bullet

    return {
      ord: bullet.ord + 1,
      parent_id: bullet.parent_id,
      topic_id: bullet.topic_id,
      type: type || this.props.bullet.type,
      title: '',
    }
  }

  // helper method to create new bullet that is first child
  newSubBullet(type) {
    const bullet = this.props.bullet

    return {
      ord: 1,
      parent_id: bullet.id,
      topic_id: bullet.topic_id,
      type: type || this.props.bullet.type,
      title: '',
    }
  }

  // create and move cursor to sibling bullet
  createNextBullet(type) {
    return this.props.createBullet(this.newSiblingBullet(type))
      .then(bullet => this.props.setFocus(bullet.id, 0, 0))
  }

  // create and move cursor to sub-bullet
  createSubBullet(bullet = this.newSubBullet()) {
    return this.props.createSubBullet(this.props.bullet.id, bullet)
      .then(subBullet => this.props.setFocus(subBullet.id, 0, 0))
  }

  // update current bullet
  updateBullet(e) {
    if (e) e.preventDefault()

    return this.props.updateBullet(this.state, this.props.bullet)
      .then(() => this.updateTimoutId = null)
  }

  // destroy and shift focus to correct bullet
  destroyBullet() {
    let focus = [null, null, null]
    const { parentBullet, prevBullet, nextBullet } = this.props

    // go up
    if (prevBullet) {
      focus = [prevBullet.id, prevBullet.title.length, prevBullet.title.length]
    // go to parent
    } else if (parentBullet) {
      focus = [parentBullet.id, parentBullet.title.length, parentBullet.title.length]
    // go to sibling
    } else if (nextBullet) {
      focus = [nextBullet.id, 0, 0]
    }
    // TODO: need access to bullet below, but maybe higher up the tree

    return this.props.destroyBullet(this.props.bullet.id)
      .then(() => focus ? this.props.setFocus(...focus) : null)
  }

  // indent bullet
  indentBullet() {
    const { prevId, prevBullet } = this.props
    const bullet = this.state

    const shiftedBullet = {
      ...bullet,
      ord: prevBullet.child_ids.length + 1,
      parent_id: prevBullet.id,
    }

    // indent and keep focus on new element
    return this.props.updateBullet(shiftedBullet, bullet)
      .then(shiftedBullet => this.props.setFocus(shiftedBullet.id, 0, 0))
  }

  outdentBullet() {
    const { parentBullet, prevBullet } = this.props
    const bullet = this.state

    const shiftedBullet = {
      ...bullet,
      ord: parentBullet.ord + 1,
      parent_id: parentBullet.parent_id,
    }

    // outdent and keep focus on new element
    return this.props.updateBullet(shiftedBullet, bullet)
      .then(shiftedBullet => this.props.setFocus(shiftedBullet.id, 0, 0))
  }

  // should probably use a library for this
  handleKeyPress(e) {

    const ctrl = e.ctrlKey ? 'Control+' : ''
    const shift = e.shiftKey ? 'Shift+' : ''
    const keyCombo = ctrl + shift + e.key

    switch(keyCombo) {
      // indent
      case 'Tab':
        e.preventDefault()
        if (this.props.bullet.ord !== 1)
          this.indentBullet()
        break

      // outdent
      case 'Shift+Tab':
        e.preventDefault()
        this.outdentBullet()
        break

      // create and go to sibling bullet
      case 'Enter':
        e.preventDefault()
        e.stopPropagation()
        // if children, create new first child
        if (this.props.bullet.child_ids.length > 0) {
          this.updateBullet(e)
            .then(this.createSubBullet.bind(this))
        // if no children, create sibling
        } else {
          this.updateBullet(e)
            .then(this.createNextBullet.bind(this))
        }
        break

      // make event
      case 'Control+e':
        let callback
        if (this.props.bullet.child_ids.length > 0) {
          callback = () => this.createSubBullet(this.newSubBullet('event'))
        } else {
          callback = () => this.createNextBullet('event')
        }

        this.updateBullet(e)
          .then(callback)
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
        // only destroy if empty, no children && not the leading bullet
        if (this.state.title === '' &&
            this.props.bullet.child_ids.length === 0 &&
            (this.props.bullet.parent_id || this.props.bullet.ord !== 1))
          this.destroyBullet()
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
        let next
        if (this.props.bullet.child_ids.length > 0)
          next = this.props.bullet.child_ids[0]
        else if (this.props.nextBullet)
          next = this.props.nextBullet.id
        if (next) this.props.setFocus(next, 0, 0)
        break
    }
  }

  // to be extended for specific bullet types
  symbol() {
    throw 'Sub-classes of BaseBullet must provide a symbol method'
  }

  // flexible render method to be used by sub classes in 'render' method
  protoRender(preForm, postForm) {
    const {dateFloater, due_date, id, title, type,} = this.state
    const { child_ids } = this.props.bullet
    const focused = this.props.focused

    return (
      <li>

        <div className='bullet'>
          {this.symbol()}

          {preForm}

          <form
            className='bullet-form'
            onKeyDown={this.handleKeyPress}
            onClick={this.handleClick}>

            <SimpleMDE
              value={title}
              placeholder={this.props.name}
              ref={comp => {
                if (comp) {
                  this.comp = comp
                  this.codemirror = comp.simplemde.codemirror
                }
              }}
              options={{
                lineWrapping: false,
                toolbar: false,
                autofocus: false,
                status: false,
              }}
              onChange={this.handleMarkdownChange.bind(this)}/>

          </form>

          {postForm}

        </div>

        <Bullets
          bullet_ids={child_ids}
          createBullet={this.createSubBullet} />

      </li>
    )
  }

  // to be extended for specific bullet types
  render() {
    throw 'Sub-classes of BulletItem must provide a render method'
  }
}

export default BaseBullet
