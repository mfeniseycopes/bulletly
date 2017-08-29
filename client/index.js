import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from './components/Root'

const render = (Component, id) => {
  debugger
  ReactDOM.render(
    <AppContainer>  
      <Component />
    </AppContainer>,
    document.getElementById(id))
}

if (module.hot) 
  module.hot.accept('./components/Root.js', () => { 
    debugger
    let NextRoot = require('./components/Root.js').default
    render(Root, 'react-root') 
  })


document.addEventListener('DOMContentLoaded', () => render(Root, 'react-root'))
