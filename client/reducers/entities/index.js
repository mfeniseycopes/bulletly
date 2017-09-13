import {
  combineReducers,
} from 'redux'

import topics from 'Reducers/entities/topics'
import bullets from 'Reducers/entities/bullets'

const entities = combineReducers({
  topics,
  bullets,
})

export default entities
