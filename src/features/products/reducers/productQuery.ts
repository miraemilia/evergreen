import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Product } from "../types/Product";

const productQueries = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5180/api/v1/products/'}),
    endpoints: (builder) => (
        {
            fetchOne: builder.query<Product, string>({
                query: (id) => `${id}`
            })
        }
    )
})

export const { useFetchOneQuery } = productQueries
export default productQueries