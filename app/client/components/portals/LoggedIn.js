import React from 'react'
import { Route } from 'react-router-dom'

import Topics from 'Components/topics/Topics'
import TopicBullets from 'Components/topics/TopicBullets'

const LoggedIn = () => (
  <main>
    <Route path='/'
      component={Topics} />
    <Route path='/topic/:topicId'
      component={TopicBullets} />
  </main>
)

export default LoggedIn
