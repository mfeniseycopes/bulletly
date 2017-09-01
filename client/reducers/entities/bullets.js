import { 
  assoc, 
  dissoc, 
  filter, 
  groupBy,
  head,
  map,
} from 'ramda'

import { 
  REMOVE_TOPIC, 
  RECEIVE_BULLET, 
  RECEIVE_BULLETS, 
  REMOVE_BULLET,
  SHIFT_BULLET_ORDS,
} from '../../actions'

const bullets = (state = {}, { type, payload }) => {

  let bullet, oldBullet

  switch(type) {
    case RECEIVE_BULLET:
      bullet = payload.bullet
      oldBullet = payload.oldBullet

      return assoc(
        bullet.id,
        bullet,
        map(
          b => {
            if (oldBullet && b.parent_id === oldBullet.parent_id &&
              b.ord > oldBullet.ord) {
              return assoc('ord', b.ord - 1, b)
            } else if (b.parent_id === bullet.parent_id &&
              b.ord >= bullet.ord) {
              return assoc('ord', b.ord + 1, b)
            } else {
              return b
            }
          },
          state))

    case RECEIVE_BULLETS:
      return map(
        head,
        groupBy(bullet => bullet.id, payload.bullets))

    case REMOVE_BULLET:
      bullet = payload.bullet
      return dissoc(bullet.id, state)

    case REMOVE_TOPIC:
      return filter(bullet => bullet.topic_id !== payload.topic.id, state)

    case SHIFT_BULLET_ORDS:
      const { topic_id, parent_id, start, shift } = payload.options
      return map(bullet =>
        (bullet.topic_id == topic_id && 
          bullet.parent_id === parent_id &&
          bullet.ord >= start) ?
        assoc('ord', bullet.ord + shift, bullet) :
        bullet, state)

    default:
      return state
  }
}

export default bullets
