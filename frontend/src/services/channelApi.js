import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const channelApi = createApi({
  reducerPath: 'channelApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    getChannel: builder.query({
      query: () => '',
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: '?',
        method: 'POST',
        body: channel,
      }),
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        url: `?/${id}`,
        method: 'DELETE',
      }),
    }),
    updateChannel: builder.mutation({
      query: ({ id, ...body }) => ({
        url: id,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { 
  useGetChannelQuery, 
  useAddChannelMutation, 
  useDeleteChannelMutation,
  useUpdateChannelMutation
} = channelApi;