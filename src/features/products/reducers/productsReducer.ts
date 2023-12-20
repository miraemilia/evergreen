import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { ProductsReducerState } from "../types/ProductsReducerState";
import { UpdateParams } from "../types/ProductUpdate";
import { NewProduct } from "../types/NewProduct";
import { ProductFilter } from "../types/ProductFilter";
import { Product } from "../types/Product";

const initialState: ProductsReducerState = {
    products: [],
    loading: false
}

export const fetchAllProducts = createAsyncThunk<Product[], void, {rejectValue: string}>(
    "products/getAllProducts",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get<Product[]>('http://localhost:5180/api/v1/products')
            if (!response.data) {
                throw new Error("Could not retreive products")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

export const fetchWithFilters = createAsyncThunk<Product[], ProductFilter[], {rejectValue: string}>(
    "products/getFiltered",
    async (filters : ProductFilter[], {rejectWithValue}) => {
        let queryParam = '?'
        filters.forEach(f =>
            queryParam += `${f.name}=${f.value}&`
        )
        try {
            const response = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/products/${queryParam}`)
            if (!response.data) {
                throw new Error("Could not retreive products")
            }
            if (response.data.length < 1) {
                throw new Error("No matches")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

export const deleteProduct = createAsyncThunk<string, string, {rejectValue:string}>(
    "products/deleteProduct",
    async (id : string, {rejectWithValue}) => {
        try {
            const response = await axios.delete<boolean>(`https://api.escuelajs.co/api/v1/products/${id}`)
            if (!response.data) {
                throw new Error("Could not delete product")
            }
            return id
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

export const updateProduct = createAsyncThunk<Product, UpdateParams, {rejectValue: string}>(
    "products/updateProduct",
    async (params : UpdateParams, {rejectWithValue} ) => {
        try {
            const response = await axios.put<Product>(
                `https://api.escuelajs.co/api/v1/products/${params.id}`,
                params.update
            )
            if (!response.data) {
                throw new Error("Could not update product")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

export const createProduct = createAsyncThunk<Product, NewProduct, {rejectValue: string}>(
    "products/createProduct",
    async (product : NewProduct, {rejectWithValue}) => {
        try {
            const response = await axios.post<Product>("https://api.escuelajs.co/api/v1/products/", product)
            if (!response.data) {
                throw new Error("Could not add product")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
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
            return {
                products: action.payload,
                loading: false,
                error: undefined
            }
        })
        builder.addCase(fetchAllProducts.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: undefined
            }
        })
        builder.addCase(fetchAllProducts.rejected, (state, action) => {
            const error = action.payload as string
            return {
                ...state,
                loading: false,
                error: error
            }
        })
        builder.addCase(fetchWithFilters.fulfilled, (state, action) => {
            return {
                products: action.payload,
                loading: false,
                error: undefined
            }
        })
        builder.addCase(fetchWithFilters.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: undefined
            }
        })
        builder.addCase(fetchWithFilters.rejected, (state, action) => {
            const error = action.payload as string
            return {
                products: [],
                loading: false,
                error: error
            }
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter(p => p.id !== action.payload)
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            const error = action.payload as string
            return {
                ...state,
                loading: false,
                error
            }
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.products.map(p => p.id === action.payload.id ? action.payload : p)
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.error = action.payload as string
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload)
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.error = action.payload as string
        })
    },
})

const productsReducer = productsSlice.reducer
export const { sortByPrice } = productsSlice.actions
export default productsReducer