import {
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux'
import thunk from 'redux-thunk'

import entities from 'Reducers/entities'
import joins from 'Reducers/joins'
import ui from 'Reducers/ui'

const root = combineReducers({
  entities,
  joins,
  ui,
})

const middlewares = [thunk]
if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').default)
}

export default createStore(root, applyMiddleware(middlewares))
