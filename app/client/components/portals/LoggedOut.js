import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'

import Landing from 'Components/about/Landing'
import { register } from 'Actions'
import { LoginForm, RegisterForm } from 'Components/auth/forms'

const LoggedOut = () => (
  <main>

    <ul>
      <li>
        <NavLink to='/register'>Register</NavLink>
      </li>
      <li>
        <NavLink to='/login'>Login</NavLink>
      </li>
    </ul>

    <Switch>
      <Route exact path='/'
        component={Landing} />
      <Route exact path='/login'
        component={LoginForm} />
      <Route exact path='/register'
        component={RegisterForm} />
    </Switch>

  </main>
)

export default LoggedOut
