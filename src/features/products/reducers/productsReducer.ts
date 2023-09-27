import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { ProductsReducerState } from "../types/ProductsReducerState";
import { ProductUpdate } from "../types/ProductUpdate";
import { Product } from "../types/Product";

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

export const deleteProduct = createAsyncThunk(
    "products/updateProduct",
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
/*
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async (id : number, update : ProductUpdate) => {
        try {
            const response = await axios.put<Product>(
                `https://api.escuelajs.co/api/v1/products/${id}`,
                JSON.stringify(update)
            )
            if (!response.data) {
                throw new Error("Could not update product")
            }
            return response.data
        } catch (e) {
            const error = e as Error
            return error.message
        }
    }
)
*/



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
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            if (typeof action.payload === "number") {
                state.products = state.products.filter(p => p.id !== action.payload)
            }
        })
    },
})

const productsReducer = productsSlice.reducer
export const { sortByPrice } = productsSlice.actions
export default productsReducer