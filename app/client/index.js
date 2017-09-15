import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from './components/Root'

import {postTopic, postTopicBullet, postSubBullet} from './api'
window.postTopic = postTopic
window.postTopicBullet = postTopicBullet
window.postSubBullet = postSubBullet

const render = (Component, id) =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById(id))

if (module.hot)
  module.hot.accept('./components/Root.js', () => {
    let NextRoot = require('./components/Root.js').default
    render(Root, 'react-root')
  })


document.addEventListener('DOMContentLoaded', () => render(Root, 'react-root'))
