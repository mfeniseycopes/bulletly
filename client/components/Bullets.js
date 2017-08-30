import { values } from 'ramda'
import React from 'react'

import BulletForm from './BulletForm'
import BulletItem from './BulletItem'

import bullets from '../styles/bullets.scss'

const Bullets = props => ( 
  <ul className='bullet-sub-list'>

    { props.bullet_ids.map(id => (
      <BulletItem key={id} bullet_id={id} 
        createBullet={props.createBullet}/>)) }
    
  </ul>
)

export default Bullets
