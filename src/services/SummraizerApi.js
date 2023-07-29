import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseUrl = "https://article-extractor-and-summarizer.p.rapidapi.com";
const headers = {
  "X-RapidAPI-Key": "b2b5c4d306mshb001c31dd76dd57p1b4b55jsnd4c0a591a909",
  "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
};

const createRequest = url => ({url , headers : headers})

export const SummraizerApi = createApi({
  reducerPath: "SummraizerApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getSummraizer: builder.query({
      query: (params) =>
        createRequest(`/summarize?url=${encodeURIComponent(params.url)}&length=3`),
    }),
  }),
});

export const {useLazyGetSummraizerQuery} = SummraizerApi