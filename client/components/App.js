import React from 'react'

import styles from '../styles/app.css'

const App = ({ children }) => (
  <main className='app'>
    <h1>Bullet Journal</h1>
    { children }
  </main>
)

export default App
