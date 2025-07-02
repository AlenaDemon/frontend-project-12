import { createSelector } from '@reduxjs/toolkit'

const selectMessagesEntities = state => state.messages.entities
const selectCurrentChannelId = state => state.ui.selectedChannelId

export const selectCurrentMessages = createSelector(
  [selectMessagesEntities, selectCurrentChannelId],
  (entities, channelId) =>
    Object.values(entities).filter(m => m.channelId === channelId),
)

export const selectCurrentMessagesCount = createSelector(
  [selectCurrentMessages],
  msgs => msgs.length,
)

export const selectCurrentChannelName = createSelector(
  [state => state.channels.entities, selectCurrentChannelId],
  (channels, channelId) => channels[channelId]?.name ?? '',
)
