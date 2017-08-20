import React from 'react'

const bulletLi = bullet => (
  <li key={bullet.id}>{bullet.title}</li>
)

const Bullets = ({ bullets }) => (
  <ul>
    { bullets.map(bulletLi) }
  </ul>
)

export default Bullets
