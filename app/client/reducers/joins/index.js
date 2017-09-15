import {
  combineReducers,
} from 'redux'

import subBullets from 'Reducers/joins/subBullets'
import topicBullets from 'Reducers/joins/topicBullets'

const joins = combineReducers({
  subBullets,
  topicBullets,
})

export default joins
