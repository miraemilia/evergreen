import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Category } from "../types/Category";
import { CategoryReducerState } from "../types/CategoryReducerState";
import { CategoryUpdateParams } from "../types/CategoryUpdate";
import { AppState } from "../../../app/store";

const initialState: CategoryReducerState = {
    categories: [],
    loading: false
}

const baseUrl = 'http://localhost:5180/api/v1/categories'

export const fetchAllCategories = createAsyncThunk<Category[], void, { rejectValue : string}>(
    "categories/getAllCategories",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(baseUrl)
            return response.data
        } catch (e) {
            const error = e as AxiosError
            let message = error.message
            if (error.response?.data){
                message = error.response?.data as string
            }
            return rejectWithValue(message)
        }
    }
)

export const deleteCategory = createAsyncThunk<string, string, {rejectValue:string}>(
    "categories/deleteCategory",
    async (id : string, {rejectWithValue}) => {
        try {
            const response = await axios.delete<boolean>(`${baseUrl}/${id}`)
            if (!response.data) {
                throw new Error("Could not delete category")
            }
            return id
        } catch (e) {
            const error = e as AxiosError
            let message = error.message
            if (error.response?.data){
                message = error.response?.data as string
            }
            return rejectWithValue(message)
        }
    }
)

export const updateCategory = createAsyncThunk<Category, CategoryUpdateParams, {rejectValue: string}>(
    "categories/updateCategory",
    async (params : CategoryUpdateParams, {rejectWithValue, getState } ) => {
        try {
            const state = getState() as AppState
            const token = state.credentialsReducer.token
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const response = await axios.patch<Category>(
                `${baseUrl}/${params.id}`,
                params.update,
                config
            )
            if (!response.data) {
                throw new Error("Could not update category")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            let message = error.message
            if (error.response?.data){
                message = error.response?.data as string
            }
            return rejectWithValue(message)
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
            const catIndex = state.categories.findIndex(c => c.id === action.payload.id)
            if (catIndex >= 0) {
                state.categories[catIndex] = action.payload
            }
        })
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.error = action.payload as string
        })
    },
})

const categoriesReducer = categoriesSlice.reducer
export default categoriesReducer