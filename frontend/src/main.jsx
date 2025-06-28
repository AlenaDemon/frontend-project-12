import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'

import App from './components/App.jsx'

const container = document.getElementById('chat')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)