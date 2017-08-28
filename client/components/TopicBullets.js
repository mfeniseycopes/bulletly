import { values } from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import Bullets from './Bullets'

import {
  retrieveTopicBullets,
  createTopicBullet,
} from '../actions'

class TopicBullets extends React.Component {

  constructor(props) {
    super(props)
    this.createTopicBullet = this.createTopicBullet.bind(this)
  }

  componentDidMount() {
    this.props.retrieveTopicBullets(this.props.topic_id)
  }

  componentWillReceiveProps(ownProps) {
    if (this.props.topic_id !== ownProps.topic_id) 
      this.props.retrieveTopicBullets(ownProps.topic_id)
  }

  createTopicBullet(bullet) {
    this.props.createTopicBullet(this.props.topic_id, bullet)
  }

  render() {
    return (
      <Bullets 
        bullet_ids={ this.props.bullet_ids } 
        submit={this.createTopicBullet} />)
  }
}

const mapStateToProps = ({ entities: { topics, bullets }, joins: { topicBullets } }, ownProps) => ({
  bullet_ids: topicBullets[ownProps.topic_id] ? 
  values(topicBullets[ownProps.topic_id]) : []
})

const mapDispatchToProps = {
  retrieveTopicBullets,
  createTopicBullet,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicBullets) 
