import React from 'react'
import ReactDOM from 'react-dom'

import Root from './components/Root'

import {postTopic, postTopicBullet, postSubBullet} from './api'
window.postTopic = postTopic
window.postTopicBullet = postTopicBullet
window.postSubBullet = postSubBullet

let render
if (process.env.NODE_ENV === 'development') {
  const { AppContainer } = require('react-hot-loader')
  render = (Component, id) =>
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById(id))
} else {
  render = (Component, id) =>
    ReactDOM.render(
      <Component />,
      document.getElementById(id))
}

if (module.hot)
  module.hot.accept('./components/Root.js', () => {
    let NextRoot = require('./components/Root.js').default
    render(Root, 'react-root')
  })


document.addEventListener('DOMContentLoaded', () => render(Root, 'react-root'))
