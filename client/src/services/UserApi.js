import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
    }),
    endpoints: (builder) => ({
        signupUser: builder.mutation({
            query: (user) => ({
                url: '/user/signUp',
                method: "POST",
                body: user,
            }),
        }),

        signInUser: builder.mutation({
            query: (user) => ({
                url: '/user/signIn',
                method: "POST",
                body: user,
            }),
        }),

        signOut: builder.mutation({
            query: (payload) => ({
                url: "/logout",
                method: "DELETE",
                body: payload
            }),
        }),
    })
})

export const { useSignupUserMutation,  useSignInUserMutation, useSignOutMutation} = userApi;
export default userApi;
