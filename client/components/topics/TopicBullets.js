import { assoc, find, prop, sortBy, values, } from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import Bullets from '../bullets/Bullets'
import { ModalLink, ModalRoute, }from '../ModalRouter'
import TopicForm from './TopicForm'
import TopicDeleteForm from './TopicDeleteForm'

import {
  createTopicBullet,
  retrieveTopicBullets,
  setFocus,
} from '../../actions'

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
        .then(() => this.props.setFocus(this.props.topic.bullet_ids[0]))
        .then(() => this.setState({ fetching: false }))
    }
  }

  createBullet(bullet) {
    return this.props.createTopicBullet(this.props.match.params.topicId, bullet)
  }

  render(){

    if (this.state.fetching) return <div>'...loading'</div>

    return (
      <article className='bullets'>

        <ModalRoute
          path={`${this.props.match.path}/edit`}
          component={TopicForm}/>

        <ModalLink
          to={`${this.props.location.pathname}/edit`}>
          ✏️
        </ModalLink>

        <ModalRoute
          path={`${this.props.match.path}/confirm-delete`}
          component={TopicDeleteForm}/>

        <ModalLink
          to={`${this.props.location.pathname}/confirm-delete`}>
          Ⓧ
        </ModalLink>

        <Bullets
          bullet_ids={this.props.topic.bullet_ids}
          createBullet={this.createBullet} />

      </article>
    )
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
  createTopicBullet,
  retrieveTopicBullets,
  setFocus,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicBullets)
