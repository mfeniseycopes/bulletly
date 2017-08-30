import { sort, values, } from 'ramda'
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
    this.createFirstBullet = this.createFirstBullet.bind(this)
    this.createNextBullet = this.createNextBullet.bind(this)
    this.state = { fetching: true }
  }

  componentDidMount() {
    this.props.retrieveTopicBullets(this.props.match.params.topicId)
      .then(() => this.setState({ fetching: false }))
  }

  componentWillReceiveProps(ownProps) {
    if (this.props.match.params.topicId !== ownProps.match.params.topicId) {
      this.setState({ fetching: true })

      this.props.retrieveTopicBullets(ownProps.match.params.topicId)
        .then(() => this.setState({ fetching: false }))
    }
  }

  createFirstBullet(bullet) {
    return this.props.createTopicBullet(this.props.match.params.topicId, bullet)
  }

  createNextBullet(prevId) {
    return bullet => {
      bullet.prev_id = prevId
      return this.props.createTopicBullet(this.props.topic_id, bullet)
    }
  }

  render(){

    if (this.state.fetching) return <div>'...loading'</div>

    if (!this.state.fetching && !this.props.topic) return <Redirect to='/' />

    return (
      <article className='bullets'>
        <Bullets 
          bullet_ids={this.props.bullet_ids} 
          createFirstBullet={this.createTopicBullet} 
          createNextBullet={this.createNextBullet} />
      </article>)
  }
}

const mapStateToProps = ({ entities: { topics, bullets }, joins: { topicBullets } }, ownProps) => {
  const bullet_ids = sort((a, b) => a.next_id - b.next_id, 
    values(topicBullets[ownProps.match.params.topicId]))

  return {
    topic: topics[ownProps.match.params.topicId],
    bullet_ids,
  }
}

const mapDispatchToProps = {
  retrieveTopicBullets,
  createTopicBullet,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicBullets) 
