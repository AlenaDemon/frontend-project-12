import React from 'react'
import ReactDOM from 'react-dom/client'

import init from './init.jsx'

const container = document.getElementById('chat')
const root = ReactDOM.createRoot(container)
root.render(await init())
