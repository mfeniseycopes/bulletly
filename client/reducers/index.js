import { 
  applyMiddleware,
  combineReducers, 
  createStore 
} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import topics from './topics'
import bullets from './bullets'
import joins from './joins'

const root = combineReducers({
  entities: combineReducers({ topics, bullets }),
  joins,
})

export default createStore(root, applyMiddleware(thunk, logger))
