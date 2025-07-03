import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import path from '../routes/routes.js'

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  tagTypes: ['Channel'],
  baseQuery: fetchBaseQuery({
    baseUrl: path.api,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    getChannels: builder.query({
      query: username => ({
        url: path.channels,
        params: { user: username },
      }),
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      query: channel => ({
        url: path.channels,
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channel'],
    }),
    removeChannel: builder.mutation({
      query: id => ({
        url: path.channelId(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Channel'],
    }),
    renameChannel: builder.mutation({
      query: ({ id, ...body }) => ({
        url: path.channelId(id),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Channel'],
    }),
  }),
})

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} = channelsApi
