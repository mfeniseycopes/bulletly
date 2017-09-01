import { values } from 'ramda'
import React from 'react'

import BulletItem from './BulletItem'

import bullets from '../styles/bullets.scss'

const Bullets = props => {
  return (
    <ul className='bullet-sub-list'>

      { 
        props.bullet_ids.map((id, idx, arr) => 
        <BulletItem key={id} bullet_id={id} 
          createBullet={props.createBullet}
          prevId={idx !== 0 ? arr[idx-1] : null} />)
      }

    </ul>)
}

export default Bullets
