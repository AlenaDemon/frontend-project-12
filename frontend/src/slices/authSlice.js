import { createSlice } from '@reduxjs/toolkit'

const initUsername = localStorage.getItem('username') ?? ''
const initToken = localStorage.getItem('token') ?? ''

const initialState = {
  username: initUsername,
  token: initToken,
  isAuthenticated: !!initToken,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      const { username, token } = payload
      state.username = username
      state.isAuthenticated = true
      state.token = token
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
    },
    removeAuth: (state) => {
      state.username = ''
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
})

export const { setAuth, removeAuth } = authSlice.actions
export const selectAuth = (state) => state.auth
export default authSlice.reducer