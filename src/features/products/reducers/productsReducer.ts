import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { ProductsReducerState } from "../types/ProductsReducerState";
import { UpdateParams } from "../types/ProductUpdate";
import { NewProduct } from "../types/NewProduct";
import { ProductFilter } from "../types/ProductFilter";

const initialState: ProductsReducerState = {
    products: [],
    loading: false
}

export const fetchAllProducts = createAsyncThunk(
    "products/getAllProducts",
    async () => {
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/products')
            if (!response.data) {
                throw new Error("Could not retreive products")
            }
            return response.data
        } catch (e) {
            const error = e as Error
            return error.message
        }
    }
)

export const fetchWithFilters = createAsyncThunk(
    "products/getFiltered",
    async (filters : ProductFilter[]) => {
        let queryParam = '?'
        filters.forEach(f =>
            queryParam += `${f.name}=${f.value}&`
        )
        try {
            const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${queryParam}`)
            if (!response.data) {
                throw new Error("Could not retreive products")
            }
            return response.data
        } catch (e) {
            const error = e as Error
            return error.message
        }
    }
)

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id : number) => {
        try {
            const response = await axios.delete<boolean>(`https://api.escuelajs.co/api/v1/products/${id}`)
            if (!response.data) {
                throw new Error("Could not delete product")
            }
            return id
        } catch (e) {
            const error = e as Error
            return error.message
        }
    }
)

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async (params : UpdateParams) => {
        try {
            const response = await axios.put(
                `https://api.escuelajs.co/api/v1/products/${params.id}`,
                params.update
            )
            if (!response.data) {
                throw new Error("Could not update product")
            }
            if (response.data.length < 1) {
                throw new Error("No matches")
            }
            return response.data
        } catch (e) {
            const error = e as Error
            return error.message
        }
    }
)

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (product : NewProduct) => {
        try {
            const response = await axios.post(`https://api.escuelajs.co/api/v1/products/`, product)
            if (!response.data) {
                throw new Error("Could not add product")
            }
            return response.data
        } catch (e) {
            const error = e as Error
            return error.message
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        sortByPrice: (state, action: PayloadAction<'asc' | 'desc'>) => {
            if (action.payload === 'asc') {
                state.products.sort((a, b) => a.price - b.price)
            } else {
                state.products.sort((a, b) => b.price - a.price)
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            if(action.payload instanceof Error) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.message
                }
            }
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        }),
        builder.addCase(fetchAllProducts.pending, (state, action) => {
            return {
                ...state,
                loading: true
            }
        }),
        builder.addCase(fetchAllProducts.rejected, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.message
                }  
            }
        }),
        builder.addCase(fetchWithFilters.fulfilled, (state, action) => {
            if(action.payload instanceof Error) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.message
                }
            }
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        }),
        builder.addCase(fetchWithFilters.pending, (state, action) => {
            return {
                ...state,
                loading: true
            }
        }),
        builder.addCase(fetchWithFilters.rejected, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.message
                }  
            }
        }),
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            if (typeof action.payload === "number") {
                state.products = state.products.filter(p => p.id !== action.payload)
            }
        }),
        builder.addCase(deleteProduct.rejected, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.message
                }
            }
        }),
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    error: action.payload.message
                }
            }
            state.products.map(p => p.id === action.payload.id ? action.payload : p)
        }),
        builder.addCase(updateProduct.rejected, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.message
                }
            }
        }),
        builder.addCase(createProduct.fulfilled, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    error: action.payload.message
                }
            }
            state.products.push(action.payload)
        }),
        builder.addCase(createProduct.rejected, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.message
                }
            }
        })
    },
})

const productsReducer = productsSlice.reducer
export const { sortByPrice } = productsSlice.actions
export default productsReducer