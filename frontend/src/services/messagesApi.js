import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import path from '../routes/routes.js'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  tagTypes: ['Message'],
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
    getMessages: builder.query({
      query: () => path.messages,
      providesTags: ['Message'],
    }),
    addMessage: builder.mutation({
      query: message => ({
        url: path.messages,
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Message'],
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi
