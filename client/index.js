import React from 'react'
import ReactDOM from 'react-dom'

const renderReact = () => ReactDOM.render(<div>React is here</div>,  document.getElementById('react-root'))

document.addEventListener('DOMContentLoaded', renderReact)
