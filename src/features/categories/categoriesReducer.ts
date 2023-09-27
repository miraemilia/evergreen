import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Category } from "./types/Category";

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
    async () => {
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/categories')
            if (!response.data) {
                throw new Error("Could not retreive categories")
            }
            return response.data
        } catch (e) {
            const error = e as Error
            return error.message
        }
    }
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
            if(action.payload instanceof Error) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.message
                }
            }
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

const categoriesReducer = categoriesSlice.reducer
export default categoriesReducer