import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { UsersReducerState } from "../types/UsersReducerState";
import { UserUpdateParams } from "../types/UserUpdate";
import { NewUser } from "../types/NewUser"
import { RoleUpdateParams } from "../types/RoleUpdate";
import { User } from "../types/User";
import { PageableUsers } from "../types/PageableUsers";
import { GetAllParams } from "../../../shared/types/GetAllParams";
import { DeleteParams } from "../../../shared/types/DeleteParams";

const initialState: UsersReducerState = {
    users: [],
    totalUsers: 0,
    loading: false
}

const baseUrl = 'https://evergreenbotanics.azurewebsites.net/api/v1/users'
const profileBaseUrl = 'https://evergreenbotanics.azurewebsites.net/api/v1/auth/profile/'

export const fetchAllUsers = createAsyncThunk<PageableUsers, GetAllParams, {rejectValue: string}>(
    "users/getAllUsers",
    async (params : GetAllParams, { rejectWithValue }) => {
        try {
            const config = {
                headers : {
                    "Authorization": `Bearer ${params.token}`
                }
            }
            const response = await axios.get<PageableUsers>(`${baseUrl}/?Limit=${params.limit}&Offset=${params.offset}`, config)
            if (!response.data) {
                throw new Error("Could not retreive users")
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

export const deleteUser = createAsyncThunk<string, DeleteParams, {rejectValue:string}>(
    "users/deleteUser",
    async (params : DeleteParams, { rejectWithValue }) => {
        try {
            const config = {
                headers : {
                    "Authorization": `Bearer ${params.token}`
                }
            }
            const response = await axios.delete<boolean>(`${baseUrl}/${params.id}`, config)
            if (!response.data) {
                throw new Error("Could not delete user")
            }
            return params.id
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

export const updateUser = createAsyncThunk<User, UserUpdateParams, {rejectValue:string}>(
    "users/updateUser",
    async (params : UserUpdateParams, { rejectWithValue }) => {
        try {
            const config = {
                headers : {
                    "Authorization": `Bearer ${params.token}`
                }
            }
            const response = await axios.patch<User>(
                profileBaseUrl,
                params.update,
                config
            )
            if (!response.data) {
                throw new Error("Could not update user")
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

export const updateUserRole = createAsyncThunk<User, RoleUpdateParams, {rejectValue:string}>(
    "users/updateUserRole",
    async (params : RoleUpdateParams, { rejectWithValue }) => {
        try {
            const config = {
                headers : {
                    "Authorization": `Bearer ${params.token}`
                }
            }
            const response = await axios.patch<User>(
                `${baseUrl}/${params.id}`,
                { "role" : params.role },
                config
            )
            if (!response.data.name) {
                throw new Error("Could not update user role")
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

export const createUser = createAsyncThunk<User, NewUser, {rejectValue:string}>(
    "users/createUser",
    async (user : NewUser, { rejectWithValue }) => {
        try {
            const response = await axios.post<User>(profileBaseUrl, user)
            if (!response.data.id) {
                throw new Error("Could not add user")
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

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action : PayloadAction<PageableUsers>) => {
            return {
                ...state,
                users: action.payload.items,
                totalUsers: action.payload.totalItems,
                loading: false,
                error: undefined
            }
        })
        builder.addCase(fetchAllUsers.pending, (state, action) => {
            return {
                ...state,
                loading: true
            }
        })
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            const error = action.payload
            return {
                ...state,
                users: [],
                loading: false,
                error: error
            }
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter(u => u.id !== action.payload)
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.error = action.payload
        })
        builder.addCase(updateUser.fulfilled, (state, action : PayloadAction<User>) => {
            state.users.map(p => p.id === action.payload.id ? action.payload : p)
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.error = action.payload
        })
        builder.addCase(updateUserRole.fulfilled, (state, action : PayloadAction<User>) => {
            state.users.map(p => p.id === action.payload.id ? action.payload : p)
        })
        builder.addCase(updateUserRole.rejected, (state, action) => {
            state.error = action.payload
        })
        builder.addCase(createUser.fulfilled, (state, action : PayloadAction<User>) => {
            state.users.push(action.payload)
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.payload
        })
    },
})

const userReducer = userSlice.reducer
export default userReducer