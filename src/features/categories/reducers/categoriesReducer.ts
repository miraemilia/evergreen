import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Category } from "../types/Category";

const initialState: {
    categories: Category[]
    error?: string
    loading: boolean
} = {
    categories: [],
    loading: false
}

export const fetchAllCategories = createAsyncThunk(
    "categories/getAllCategories",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get<Category[]>('https://api.escuelajs.co/api/v1/categories')
            if (!response.data) {
                throw new Error("Could not retreive categories")
            }
            return response.data
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
            return {
                ...state,
                categories: action.payload,
                loading: false
            }
        }),
        builder.addCase(fetchAllCategories.pending, (state, action) => {
            return {
                ...state,
                loading: true
            }
        }),
        builder.addCase(fetchAllCategories.rejected, (state, action) => {
            const error = action.payload as string
            return {
                ...state,
                loading: false,
                error: error
            }  
        })
    },
})

const categoriesReducer = categoriesSlice.reducer
export default categoriesReducer