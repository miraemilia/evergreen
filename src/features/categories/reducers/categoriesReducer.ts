import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Category } from "../types/Category";
import { CategoryReducerState } from "../types/CategoryReducerState";

const initialState: CategoryReducerState = {
    categories: [],
    loading: false
}

export const fetchAllCategories = createAsyncThunk<Category[], void, { rejectValue : string}>(
    "categories/getAllCategories",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/categories')
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
            state.categories = action.payload
            state.loading = false
        }),
        builder.addCase(fetchAllCategories.pending, (state, action) => {
            state.loading = true
        }),
        builder.addCase(fetchAllCategories.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
    },
})

const categoriesReducer = categoriesSlice.reducer
export default categoriesReducer