import { createSlice } from '@reduxjs/toolkit'

const defaultChannelId = '1'
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    selectedChannelId: defaultChannelId,
    typeModal: null,
    processedChannel: null,
  },
  reducers: {
    selectChannel(state, action) {
      state.selectedChannelId = action.payload
    },
    showModal(state, action) {
      const { type, channel } = action.payload
      state.typeModal = type
      state.processedChannel = channel
    },
    hideModal(state) {
      state.typeModal = null
      state.processedChannel = null
    },
  },
})

export const { selectChannel, showModal, hideModal } = uiSlice.actions
export default uiSlice.reducer
