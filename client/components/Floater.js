import React from 'react'

import floater from '../styles/floater.scss'

const Floater = ({visible, children, blurCallback}) => (
  visible ?
  <div className='floater' onBlur={blurCallback}>
    <div className='floater-container' onBlur={e => e.stopPropagation()}>
      {children} 
    </div>
  </div> : null
)

export default Floater
