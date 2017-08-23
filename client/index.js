import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './reducers'
import components from './components'
const { App, Topics, Bullets } = components

const dummyTopics = [
  { id: 1, title: 'topic 1' },
  { id: 2, title: 'topic 2' },
  { id: 3, title: 'topic 3' },
  { id: 4, title: 'topic 4' },
  { id: 5, title: 'topic 5' },
  { id: 6, title: 'topic 6' },
  { id: 7, title: 'topic 7' },
]

const dummyBullets = [
  { id: 1, title: 'bullet 1' },
  { id: 2, title: 'bullet 2' },
  { id: 3, title: 'bullet 3' },
  { id: 4, title: 'bullet 4' },
  { id: 5, title: 'bullet 5' },
  { id: 6, title: 'bullet 6' },
  { id: 7, title: 'bullet 7' },
]

const root = (
  <Provider store={ store }>
    <App>
      <Topics topics={dummyTopics} />
      <Bullets bullets={dummyBullets} />
    </App>
  </Provider>
)

const renderReact = () =>
  ReactDOM.render(root,  document.getElementById('react-root'))

document.addEventListener('DOMContentLoaded', renderReact)
