import React from 'react'
import { connect } from 'react-redux'

import {
  createTopicBullet,
  createSubBullet,
  updateBullet,
  destroyBullet,
} from '../actions'

const BulletItem = ({ bullet })=> (
  <li>{bullet.title}</li>
)

const Bullets = props => ( 
<ul>
  { props.bullets.map(b => <BulletItem key={b.id} bullet={b} />) }
</ul>
  )

const mapDispatchToProps = {
  createTopicBullet,
  createSubBullet,
  updateBullet,
  destroyBullet,
}
export default connect(null, mapDispatchToProps)(Bullets)
