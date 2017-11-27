import React from 'react'
import { 
  connect
} from 'react-redux'

import { 
  logout,
} from 'Actions'

const LogoutButton = props => {
  const logout = e => {
    e.preventDefault()
    props.logout()
  }

  return (
    <button onClick={ logout }>Logout</button>
  )
}

export default connect(null, { logout })(LogoutButton)

