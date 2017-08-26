import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './reducers'
import App from './components/App'
import Topics from './components/Topics'
import TopicBullets from './components/TopicBullets'
import { retrieveBullets, createTopicBullet, createSubBullet } from './actions'

window.store = store
window.createTopicBullet = createTopicBullet
window.createSubBullet = createSubBullet
//store.dispatch(retrieveBullets())


const root = (
  <Provider store={ store }>
    <App>
      <TopicBullets topic_id="13"/>
    </App>
  </Provider>
)

const renderReact = () =>
  ReactDOM.render(root,  document.getElementById('react-root'))

document.addEventListener('DOMContentLoaded', renderReact)
