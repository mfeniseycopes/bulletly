import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import LoggedIn from 'Components/portals/LoggedIn'
import LoggedOut from 'Components/portals/LoggedOut'

import styles from 'Styles/app.scss'

const App = ({ loggedIn }) => (
  <main className='app'>

    <navbar>
      <h1><Link to='/'>bulletly</Link></h1>
    </navbar>

    { loggedIn ? <LoggedIn/> : <LoggedOut/> }

  </main>
)

const mapStateToProps = state => ({
  loggedIn: !!state.session.user,
})

export default withRouter(connect(mapStateToProps)(App))
