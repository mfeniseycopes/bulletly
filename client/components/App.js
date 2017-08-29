import React from 'react'

import styles from '../styles/app.scss'

const App = ({ children }) => (
  <main className='app'>

    <navbar>
      
      <h1>Bullet Journal</h1>

    </navbar>

    <main>

      { children }

    </main>

  </main>
)

export default App
