import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Route } from 'react-router-dom'

import store from './reducers'
import App from './components/App'
import Topics from './components/Topics'
import TopicBullets from './components/TopicBullets'

const root = (
  <Provider store={ store }>
    <HashRouter>
      <App>
        <Route path='/' component={Topics} />
        <Route path='/topic/:topicId' component={TopicBullets} />
      </App>
    </HashRouter>
  </Provider>
)

const renderReact = () =>
  ReactDOM.render(root,  document.getElementById('react-root'))

document.addEventListener('DOMContentLoaded', renderReact)
