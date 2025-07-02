import { configureStore } from '@reduxjs/toolkit'
import { channelsApi } from '../services/channelsApi.js'
import { messagesApi } from '../services/messagesApi.js'
import { authApi } from '../services/authApi.js'
import authReducer from '../slices/authSlice.js'
import channelsReducer from '../slices/channelsSlice.js'
import uiReducer from '../slices/uiSlice.js'
import messagesReducer from '../slices/messagesSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    ui: uiReducer,
    messages: messagesReducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware),
})

export default store
