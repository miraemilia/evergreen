import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { UsersReducerState } from "../types/UsersReducerState";
import { UserUpdateParams } from "../types/UserUpdate";
import { NewUser } from "../types/NewUser"
import { RoleUpdateParams } from "../types/RoleUpdate";
import { User } from "../types/User";
import { PageableUsers } from "../types/PageableUsers";
import { AppState } from "../../../app/store";
import { GetAllParams } from "../../../shared/types/GetAllParams";

const initialState: UsersReducerState = {
    users: [],
    totalUsers: 0,
    loading: false
}

const baseUrl = 'http://localhost:5180/api/v1/users'
const profileBaseUrl = 'http://localhost:5180/api/v1/auth/profile/'

export const fetchAllUsers = createAsyncThunk<PageableUsers, GetAllParams, {rejectValue: string}>(
    "users/getAllUsers",
    async (GetAllParams, { rejectWithValue, getState }) => {
        try {
            const state = getState() as AppState
            const token = state.credentialsReducer.token
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const response = await axios.get<PageableUsers>(`${baseUrl}/?Limit=${GetAllParams.limit}&Offset=${GetAllParams.offset}`, config)
            if (!response.data) {
                throw new Error("Could not retreive users")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

export const deleteUser = createAsyncThunk<string, string, {rejectValue:string}>(
    "users/deleteUser",
    async (id : string, { rejectWithValue, getState }) => {
        try {
            const state = getState() as AppState
            const token = state.credentialsReducer.token
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const response = await axios.delete<boolean>(`${baseUrl}/${id}`, config)
            if (!response.data) {
                throw new Error("Could not delete user")
            }
            return id
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (params : UserUpdateParams, { rejectWithValue, getState }) => {
        try {
            const state = getState() as AppState
            const token = state.credentialsReducer.token
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
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
            console.log(error)
            return rejectWithValue(error.message)
        }
    }
)

export const updateUserRole = createAsyncThunk(
    "users/updateUserRole",
    async (params : RoleUpdateParams, { rejectWithValue, getState }) => {
        try {
            const state = getState() as AppState
            const token = state.credentialsReducer.token
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
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
            return rejectWithValue(error.message)
        }
    }
)

export const createUser = createAsyncThunk(
    "users/createUser",
    async (user : NewUser, { rejectWithValue }) => {
        try {
            console.log(user)
            const response = await axios.post<User>(baseUrl, user)
            console.log(response)
            if (!response.data) {
                throw new Error("Could not add user")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
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
            const error = action.payload as string
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
            state.error = action.payload as string
        })
        builder.addCase(updateUser.fulfilled, (state, action : PayloadAction<User>) => {
            state.users.map(p => p.id === action.payload.id ? action.payload : p)
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.error = action.payload as string
        })
        builder.addCase(updateUserRole.fulfilled, (state, action : PayloadAction<User>) => {
            state.users.map(p => p.id === action.payload.id ? action.payload : p)
        })
        builder.addCase(updateUserRole.rejected, (state, action) => {
            state.error = action.payload as string
        })
        builder.addCase(createUser.fulfilled, (state, action : PayloadAction<User>) => {
            state.users.push(action.payload)
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.payload as string
        })
    },
})

const userReducer = userSlice.reducer
export default userReducer