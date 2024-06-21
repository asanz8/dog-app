import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BreedsObject, Breed } from "./types"

export const breedsApiSlice = createApi({
  reducerPath: "breedsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dog.ceo/api" }),
  endpoints: builder => ({
    getAllBreeds: builder.query<Breed[], void>({
      query: () => "/breeds/list/all",
      transformResponse: (response: any): Breed[] => {
        const breeds = response.message
        return [
          ...Object.keys(breeds).map(name => ({
            name,
            subBreeds: breeds[name],
          })),
        ]
      },
    }),

    getBreedImages: builder.query<string[], string>({
      query: (breed: string) => `/breed/${breed}/images`,
      transformResponse: (response: any): string[] => {
        return response.message
      },
    }),
  }),
})

export const { useGetAllBreedsQuery, useGetBreedImagesQuery } = breedsApiSlice
