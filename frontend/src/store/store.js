import { configureStore } from '@reduxjs/toolkit'
import { channelApi } from '../services/channelApi.js'
import { messageApi } from '../services/messageApi.js'
import { authApi } from '../services/authApi.js'
import authReducer from '../slices/authSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelApi.reducerPath]: channelApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(channelApi.middleware)
      .concat(messageApi.middleware),
})

export default store