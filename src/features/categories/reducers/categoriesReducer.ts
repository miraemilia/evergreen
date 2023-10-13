import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Category } from "../types/Category";
import { CategoryReducerState } from "../types/CategoryReducerState";
import { CategoryUpdateParams } from "../types/CategoryUpdate";

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

export const deleteCategory = createAsyncThunk<number, number, {rejectValue:string}>(
    "categories/deleteCategory",
    async (id : number, {rejectWithValue}) => {
        try {
            const response = await axios.delete<boolean>(`https://api.escuelajs.co/api/v1/categories/${id}`)
            if (!response.data) {
                throw new Error("Could not delete category")
            }
            return id
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

export const updateCategory = createAsyncThunk<Category, CategoryUpdateParams, {rejectValue: string}>(
    "products/updateProduct",
    async (params : CategoryUpdateParams, {rejectWithValue} ) => {
        try {
            const response = await axios.put<Category>(
                `https://api.escuelajs.co/api/v1/categories/${params.id}`,
                params.update
            )
            if (!response.data) {
                throw new Error("Could not update category")
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
            state.categories = action.payload
            state.loading = false
        })
        builder.addCase(fetchAllCategories.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchAllCategories.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter(p => p.id !== action.payload)
        })
        builder.addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.categories.map(p => p.id === action.payload.id ? action.payload : p)
        })
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.error = action.payload as string
        })
    },
})

const categoriesReducer = categoriesSlice.reducer
export default categoriesReducer