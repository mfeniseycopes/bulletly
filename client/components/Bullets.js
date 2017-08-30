import { values } from 'ramda'
import React from 'react'

import BulletForm from './BulletForm'
import BulletItem from './BulletItem'

import bullets from '../styles/bullets.scss'

const Bullets = props => ( 
  <ul className='bullet-sub-list'>

    { props.bullet_ids.map((id, arr, idx) => {
        const createFn = idx === 0 ?
          props.createFirstBullet :
          props.createNextBullet(arr[idx-1])
        return (
          <BulletItem key={id} bullet_id={id} 
            createBullet={createFn}/>) 
      })
    }
    
  </ul>
)

export default Bullets
