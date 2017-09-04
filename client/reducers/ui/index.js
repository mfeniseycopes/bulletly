import { assoc } from 'ramda'

import { SET_FOCUS } from '../../actions'

const defaultUI = () => ({
  focus: {
    id: null,
    selectionStart: null,
    selectionEnd: null,
  }
})

const ui = (state=defaultUI(), {type, payload}) => {
  switch(type) {
    case SET_FOCUS:
      return assoc('focus', payload, state)

    default:
      return state
  }
}

export default ui
