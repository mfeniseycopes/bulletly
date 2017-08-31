import changeHandler from 'memoized-change-handler'
import { sort, values } from 'ramda'
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

    this.props.updateBullet(this.state)
      .then(this.createNextBullet)
  }

  destroyBullet(e) {
    e.preventDefault()

    return this.props.destroyBullet(this.props.bullet.id)
  }

  indentBullet(e) {
    e.preventDefault()

    const { bullet, prevId } = this.props

    const shiftedBullet = {
      ...bullet, 
      ord: 1,
      parent_id: prevId, 
    }

    return this.props.updateBullet(shiftedBullet)
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
            onSubmit={this.updateBullet} >

            <input
              value={this.state.title || ''}
              placeholder={this.props.name}
              onChange={this.handleChange('title')}/>

          </form>

          <button onClick={destroyBullet}>❎</button>
          <button onClick={indentBullet}>➡️</button>
        </div>

        <Bullets
          bullet_ids={this.props.child_ids} 
          createBullet={createSubBullet} />

      </li>
    )
  }
}

const mapStateToProps = ({ entities: { bullets }, joins: { subBullets }}, ownProps) => {
  const child_ids = values(subBullets[ownProps.bullet_id])
  child_ids.sort((a, b) => bullets[a].ord - bullets[b].ord)

  return {
    bullet: bullets[ownProps.bullet_id],
    child_ids,
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
