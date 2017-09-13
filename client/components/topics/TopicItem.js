import React from 'react'
import { NavLink, } from 'react-router-dom'

const TopicItem = ({ topic }) => (
  <li>
    <NavLink
      to={`/topic/${topic.id}`}
      activeClassName='active-topic-link'>
      {topic.title}
    </NavLink>
  </li>)

export default TopicItem
