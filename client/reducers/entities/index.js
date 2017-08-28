import {
  combineReducers,
} from 'redux'

import topics from './topics'
import bullets from './bullets'

const entities = combineReducers({
  topics,
  bullets,
})

export default entities
