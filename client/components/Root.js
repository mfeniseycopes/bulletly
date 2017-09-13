import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Route } from 'react-router-dom'

import store from '../reducers'
import App from './App'
import Topics from './topics/Topics'
import TopicBullets from './topics/TopicBullets'

const Root = () => (
  <Provider store={ store }>
    <HashRouter>
      <App>
        <Route component={Topics} />
        <Route path='/topic/:topicId' component={TopicBullets} />
      </App>
    </HashRouter>
  </Provider>
)

export default Root
