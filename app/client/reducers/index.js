import {
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import entities from 'Reducers/entities'
import joins from 'Reducers/joins'
import ui from 'Reducers/ui'

const root = combineReducers({
  entities,
  joins,
  ui,
})

export default createStore(root, applyMiddleware(thunk, logger))
