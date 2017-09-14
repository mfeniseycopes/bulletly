import { assoc, find, prop, sortBy, values, } from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import Bullets from 'Components/bullets/Bullets'
import { ModalLink, ModalRoute, }from 'Components/ModalRouter'
import TopicForm from 'Components/topics/TopicForm'
import TopicDeleteForm from 'Components/topics/TopicDeleteForm'

import {
  createTopicBullet,
  retrieveTopicBullets,
  setFocus,
} from 'Actions'

import topicBullets from 'Styles/topics/topic-bullets.scss'

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
      <div className='topic-view'>

        <article className='bullets'>

          <ModalRoute
            path={`${this.props.match.path}/edit`}
            component={TopicForm}/>

          <ModalRoute
            path={`${this.props.match.path}/confirm-delete`}
            component={TopicDeleteForm}/>

          <Bullets
            bullet_ids={this.props.topic.bullet_ids}
            createBullet={this.createBullet} />

        </article>

        <section className='topic-actions'>

          <ModalLink
            to={`${this.props.location.pathname}/edit`}>
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </ModalLink>

          <ModalLink
            to={`${this.props.location.pathname}/confirm-delete`}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </ModalLink>

        </section>

      </div>
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
