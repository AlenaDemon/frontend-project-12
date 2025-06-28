import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    getMessage: builder.query({
      query: () => '?',
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: '?',
        method: 'POST',
        body: message,
      }),
    }),
  }),
})

export const { 
  useGetMessageQuery, 
  useAddgetMessageMutation 
} = messageApi