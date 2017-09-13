import React from 'react'
import {Link} from 'react-router-dom'
import styles from '../styles/app.scss'

const App = ({ children }) => (
  <main className='app'>

    <navbar>
      <h1><Link to='/'>bullet journal</Link></h1>
    </navbar>

    <main>
      { children }
    </main>

  </main>
)

export default App
