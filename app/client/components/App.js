import React from 'react'
import {Link} from 'react-router-dom'
import styles from 'Styles/app.scss'

const App = ({ children }) => (
  <main className='app'>

    <navbar>
      <h1><Link to='/'>bulletly</Link></h1>
    </navbar>

    <main>
      { children }
    </main>

  </main>
)

export default App
