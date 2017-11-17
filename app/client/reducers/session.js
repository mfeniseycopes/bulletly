import { assoc } from 'ramda'

import { RECEIVE_CURRENT_USER } from 'Actions'

const defaultState = {
  user: null,
}

const session = (state = defaultState, {type, payload}) => {
  switch(type) {
    case RECEIVE_CURRENT_USER:
      return assoc('user', payload.user, state)

    default:
      return state
  }
}

export default session
