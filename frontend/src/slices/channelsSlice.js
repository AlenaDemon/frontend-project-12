import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { channelsApi } from '../services/channelsApi.js'

const channelsAdapter = createEntityAdapter()

const initialState = channelsAdapter.getInitialState()

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    renameChannel: channelsAdapter.updateOne,
    clearAll: channelsAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        channelsApi.endpoints.getChannels.matchFulfilled,
        (state, action) => {
          channelsAdapter.upsertMany(state, action.payload)
        },
      )
  },
})

export const {
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions

export const {
  selectAll: selectAllChannels,
  selectById: selectChannelById,
  selectIds: selectChannelIds,
} = channelsAdapter.getSelectors(state => state.channels)

export default channelsSlice.reducer
