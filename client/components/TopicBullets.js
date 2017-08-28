import { values } from 'ramda'
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
    this.createTopicBullet = this.createTopicBullet.bind(this)
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

  createTopicBullet(bullet) {
    this.props.createTopicBullet(this.props.match.params.topicId, bullet)
  }

  render(){
    debugger

    if (this.state.fetching) return <div>'...loading'</div>

    if (!this.state.fetching && !this.props.topic) return <Redirect to='/' />

    return (
      <Bullets 
        bullet_ids={this.props.bullet_ids} 
        submit={this.createTopicBullet} />)
  }
}

const mapStateToProps = ({ entities: { topics, bullets }, joins: { topicBullets } }, ownProps) => {
  return {
    topic: topics[ownProps.match.params.topicId],
    bullet_ids: values(topicBullets[ownProps.match.params.topicId]),
  }
}

const mapDispatchToProps = {
  retrieveTopicBullets,
  createTopicBullet,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicBullets) 
