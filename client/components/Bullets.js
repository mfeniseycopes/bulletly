import changeHandler from 'memoized-change-handler'
import { values } from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import {
  createSubBullet,
  updateBullet,
  destroyBullet,
} from '../actions'

class BulletItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {...(this.props.bullet)} 
    this.handleChange = changeHandler(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.bullet)
  }

  render() {

    const { bullet, updateBullet, destroyBullet } = this.props
    
    return (
      <li>

        <form 
          onSubmit={ e => { e.preventDefault(); updateBullet(this.state)  }} >
          <input
            value={this.state.title}
            placeholder='Rename Bullet' 
            onChange={this.handleChange('title')}/>
        </form>

        <button
          onClick={() => destroyBullet(bullet.id) }
          title='delete'>
          ╳ 
        </button>

        <Bullets bullet_ids={this.props.child_ids} />
      </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  bullet: state.entities.bullets[ownProps.bullet_id],
  child_ids: values(state.joins.subBullets[ownProps.bullet_id])
})

const mapDispatchToProps = {
  createSubBullet,
  updateBullet,
  destroyBullet,
}

const ConnectedBulletItem = connect(mapStateToProps, mapDispatchToProps)(BulletItem)

const Bullets = props => (
  <ul>
    { props.bullet_ids.map(id => <ConnectedBulletItem key={id} bullet_id={id} />) }
  </ul>
)

export default connect(null, mapDispatchToProps)(Bullets)
