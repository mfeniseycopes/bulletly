import { 
  applyMiddleware,
  combineReducers, 
  createStore 
} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import topics from './topics'
import bullets from './bullets'

const root = combineReducers({
  entities: combineReducers({ topics, bullets })
})

export default createStore(root, applyMiddleware(thunk, logger))
