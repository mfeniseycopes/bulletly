import { values } from 'ramda'
import React from 'react'

import BulletItem from './BulletItem'

import bullets from '../styles/bullets.scss'

const Bullets = props => ( 
  <ul className='bullet-sub-list'>

    { props.bullet_ids.map((id, arr, idx) => 
      <BulletItem key={id} bullet_id={id} 
        createBullet={props.createBullet}
        prevId={arr[idx-1] - 1}/>) 
    }
    
  </ul>
)

export default Bullets
