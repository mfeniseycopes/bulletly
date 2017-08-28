import { 
  combineReducers, 
} from 'redux'

import subBullets from './subBullets'
import topicBullets from './topicBullets'

const joins = combineReducers({
  subBullets,
  topicBullets,
})

export default joins
