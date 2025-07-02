import { createSlice } from '@reduxjs/toolkit'
import { channelsApi } from '../services/channelsApi.js'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || '',
    isAuthenticated: !!localStorage.getItem('token'),
  },
  reducers: {
    setAuth: (state, { payload }) => {
      state.username = payload.username
      state.token = payload.token
      state.isAuthenticated = true
      localStorage.setItem('token', payload.token)
      localStorage.setItem('username', payload.username)
    },
    removeAuth: (state) => {
      state.username = ''
      state.token = ''
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAuth, (state, action, { dispatch }) => {
        dispatch(channelsApi.util.resetApiState())
      })
      .addCase(removeAuth, (state, action, { dispatch }) => {
        dispatch(channelsApi.util.resetApiState())
        dispatch({ type: 'channels/clearAll' })
      })
  },
})

export const { setAuth, removeAuth } = authSlice.actions
export default authSlice.reducer
