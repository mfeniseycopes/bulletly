import { values } from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import Bullets from './bullets'

import {
  retrieveTopicBullets,
} from '../actions'

class TopicBullets extends React.Component {

  componentDidMount() {
    this.props.retrieveTopicBullets(this.props.topic_id)
  }

  componentWillReceiveProps(ownProps) {
    if (this.props.topic_id !== ownProps.topic_id) 
      this.props.retrieveTopicBullets(ownProps.topic_id)
  }

  render() {
    return <Bullets bullet_ids={ this.props.bullet_ids } />
  }
}

const mapStateToProps = ({ entities: { topics, bullets }, joins: { topicBullets } }, ownProps) => ({
  bullet_ids: topicBullets[ownProps.topic_id] ? 
    values(topicBullets[ownProps.topic_id]) : []
})

const mapDispatchToProps = {
  retrieveTopicBullets,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicBullets) 
