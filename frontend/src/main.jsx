import ReactDOM from 'react-dom/client'

import init from './init.jsx'

const start = async () => {
  const container = document.getElementById('chat')
  const root = ReactDOM.createRoot(container)
  const app = await init()
  root.render(app)
}

start()
