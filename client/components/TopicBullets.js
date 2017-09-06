import { assoc, find, prop, sortBy, values, } from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Bullets from './Bullets'

import {
  retrieveTopicBullets,
  createTopicBullet,
} from '../actions'

class TopicBullets extends React.Component {

  constructor(props) {
    super(props)
    this.createBullet = this.createBullet.bind(this)
    this.state = { fetching: true }
  }

  componentDidMount() {
    this.props.retrieveTopicBullets(this.props.match.params.topicId)
      .then(() => this.setState({ fetching: false }))
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.topicId !== newProps.match.params.topicId) {
      this.setState({ fetching: true })

      this.props.retrieveTopicBullets(newProps.match.params.topicId)
        .then(() => this.setState({ fetching: false }))
    }
  }

  createBullet(bullet) {
    return this.props.createTopicBullet(this.props.match.params.topicId, bullet)
  }

  render(){

    if (this.state.fetching) return <div>'...loading'</div>

    if (!this.state.fetching && !this.props.topic) return <Redirect to='/' />
    
    return (
      <article className='bullets'>
        <Bullets 
          bullet_ids={this.props.topic.bullet_ids} 
          createBullet={this.createBullet} />
      </article>)
  }
}

const mapStateToProps = ({ entities: { topics, bullets }, joins: { topicBullets } }, ownProps) => {
  const topic = topics[ownProps.match.params.topicId]
  return {
    topic: assoc(
      'bullet_ids', 
      topicBullets[ownProps.match.params.topicId] || [], 
      topic),
  }
}

const mapDispatchToProps = {
  retrieveTopicBullets,
  createTopicBullet,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicBullets) 
