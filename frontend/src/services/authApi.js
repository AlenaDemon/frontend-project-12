import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import path from '../routes/routes.js'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: path.api,
  }),
  endpoints: builder => ({
    login: builder.mutation({
      query: values => ({
        url: path.login,
        method: 'POST',
        body: values,
      }),
    }),
    signup: builder.mutation({
      query: values => ({
        url: path.signup,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const { useLoginMutation, useSignupMutation } = authApi
