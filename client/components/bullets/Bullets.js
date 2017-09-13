import { values } from 'ramda'
import React from 'react'

import Bullet from './Bullet'

import bullets from '../../styles/bullets.scss'

const Bullets = props => {
  return (
    <ul className='bullet-sub-list'>

      {
        props.bullet_ids.map((id, idx, arr) =>
        <Bullet key={id} bullet_id={id}
          createBullet={props.createBullet}
          prevId={idx !== 0 ? arr[idx-1] : null}
          nextId={arr[idx+1]}/>)
      }

    </ul>)
}

export default Bullets
