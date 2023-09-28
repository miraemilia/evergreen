import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Product } from "../types/Product";

const productQueries = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1/products/'}),
    endpoints: (builder) => (
        {
            fetchOne: builder.query<Product, number>({
                query: (id) => `${id}`
            })
        }
    )
})

export const { useFetchOneQuery } = productQueries
export default productQueries