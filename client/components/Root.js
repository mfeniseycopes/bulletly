import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Route } from 'react-router-dom'

import store from 'Reducers'
import App from 'Components/App'
import Topics from 'Components/topics/Topics'
import TopicBullets from 'Components/topics/TopicBullets'

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
