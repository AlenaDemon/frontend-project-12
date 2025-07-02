import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { removeChannel } from './channelsSlice.js'
import { messagesApi } from '../services/messagesApi.js'

const messagesAdapter = createEntityAdapter()
const initialState = messagesAdapter.getInitialState()

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    removeMessage: messagesAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, { payload: id }) => {
        const idsToDelete = Object.values(state.entities)
          .filter(m => m.channelId === id)
          .map(m => m.id)
        messagesAdapter.removeMany(state, idsToDelete)
      })
      .addMatcher(
        messagesApi.endpoints.getMessages.matchFulfilled,
        (state, { payload }) => {
          messagesAdapter.setAll(state, payload)
        },
      )
      .addMatcher(
        messagesApi.endpoints.addMessage.matchFulfilled,
        (state, { payload }) => {
          messagesAdapter.addOne(state, payload)
        },
      )
  },
})

export const { addMessage, addMessages, removeMessage } = messagesSlice.actions
export default messagesSlice.reducer
