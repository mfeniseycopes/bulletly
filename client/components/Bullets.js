import { values } from 'ramda'
import React from 'react'

import BulletForm from './BulletForm'
import BulletItem from './BulletItem'

const Bullets = props => (
  <ul>
    { props.bullet_ids.map(id => <BulletItem key={id} bullet_id={id} />) }
    
    <BulletForm submit={props.submit} name='New Bullet' />

  </ul>
)

export default Bullets
