import { 
  applyMiddleware,
  combineReducers, 
  createStore 
} from 'redux'
import logger from 'redux-logger'

const topics = (state, action) => {
  return{}
}

const bullets = (state, action) => {
  return {}
}

const root = combineReducers({
  entities: combineReducers({ topics, bullets })
})

export default createStore(root, applyMiddleware(logger))
