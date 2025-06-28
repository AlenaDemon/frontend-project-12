import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (values) => ({
        url: '/login',
        method: 'POST',
        body: values,
      }),
    }),
    signup: builder.mutation({
      query: (values) => ({
        url: '/signup',
        method: 'POST',
        body: values,
      }),
    }),
  }),
})

export const { 
  useLoginMutation, 
  useSignupMutation 
} = authApi