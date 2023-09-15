import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPost } from "../models/IPosts";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (build) => ({
    fetchPosts: build.query<IPost[], number>({
      query: (_limit) => ({
        url: "/posts",
        params: {
          _limit,
        },
      }),
    }),
  }),
});
