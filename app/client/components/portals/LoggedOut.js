import React from 'react'
import { Route } from 'react-router-dom'

import RegisterForm from 'Components/auth/RegisterForm'

const LoggedOut = () => (
  <main>
    <Route path='/register'
      component={RegisterForm} />
  </main>
)

export default LoggedOut
