import React from 'react'
import { connect } from 'react-redux'

import Bullets from './bullets'

import {
  retrieveTopics,
  retrieveTopicBullets,
} from '../actions'

class TopicBullets extends React.Component {

  componentDidMount() {
    this.props.retrieveTopics()
      .then(() => this.props.retrieveTopicBullets(this.props.topic_id))
  }

  componentWillReceiveProps() {
     
  }

  render() {
    return <Bullets bullets={ this.props.bullets } />
  }
}

const mapStateToProps = ({ entities: { topics, bullets } }, ownProps) => {
  return {
    bullets: topics[ownProps.topic_id] ? 
      topics[ownProps.topic_id].bullet_ids.map(id => bullets[id]) : []
  }
}

const mapDispatchToProps = {
  retrieveTopics,
  retrieveTopicBullets,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicBullets) 
