import React from 'react'
import { Link, } from 'react-router-dom'

const TopicItem = ({ topic }) => (
  <li>
    <Link to={`/topic/${topic.id}`} >{ topic.title }</Link>
  </li>)

export default TopicItem
