import { 
  applyMiddleware,
  combineReducers, 
  createStore 
} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import entities from './entities'
import joins from './joins'
import ui from './ui'

const root = combineReducers({
  entities,
  joins,
  ui,
})

export default createStore(root, applyMiddleware(thunk, logger))
