import { assoc } from 'ramda'

import { SET_FOCUS } from '../../actions'

const ui = (state={}, {type, payload}) => {
  switch(type) {
    case SET_FOCUS:
      return assoc('focus', payload)

    default:
      return state
  }
}

export default ui
