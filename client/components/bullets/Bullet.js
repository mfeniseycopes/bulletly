import { assoc, sort, values } from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import {
  createSubBullet,
  updateBullet,
  destroyBullet,
  receiveBullet,
  removeBullet,
  setFocus,
} from '../../actions'

import EventBullet from './EventBullet'
import NoteBullet from './NoteBullet'
import TaskBullet from './TaskBullet'

const componentTypeMap = {
  'event': EventBullet,
  'note': NoteBullet,
  'task': TaskBullet,
}

const Bullet = props => {
  const Component = componentTypeMap[bullet.type]
  return <Component {...props}/>
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

const ConnectedBullet = connect(mapStateToProps, mapDispatchToProps)(Bullet)
ConnectedBullet.displayName = ConnectedBullet

export default ConnectedBullet
