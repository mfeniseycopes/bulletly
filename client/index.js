import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './reducers'
import App from './components/App'
import Topics from './components/Topics'
import TopicBullets from './components/TopicBullets'

const root = (
  <Provider store={ store }>
    <App>
      <Topics />
      <TopicBullets topic_id="1"/>
    </App>
  </Provider>
)

const renderReact = () =>
  ReactDOM.render(root,  document.getElementById('react-root'))

document.addEventListener('DOMContentLoaded', renderReact)
