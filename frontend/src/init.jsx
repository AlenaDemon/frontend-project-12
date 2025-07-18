import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import store from './store/store.js'
import filter from 'leo-profanity'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import resources from './locales/index.js'
import App from './App.jsx'
import { io } from 'socket.io-client'
import { addMessage } from './slices/messagesSlice.js'
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js'

const init = async () => {
  filter.loadDictionary('en')
  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
  }

  const socket = io()
  socket.on('newMessage', payload => store.dispatch(addMessage(payload)))
  socket.on('newChannel', payload => store.dispatch(addChannel({ ...payload, owner: payload.owner || payload.username })))
  socket.on('renameChannel', payload => store.dispatch(renameChannel({ id: payload.id, changes: { name: payload.name } })))
  socket.on('removeChannel', payload => store.dispatch(removeChannel(payload.id)))

  const i18n = i18next.createInstance()
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    })
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <App />
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  )
}

export default init
