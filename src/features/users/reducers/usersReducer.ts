import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { UsersReducerState } from "../types/UsersReducerState";
import { UserUpdateParams } from "../types/UserUpdate";
import { NewUser } from "../types/NewUser"
import { RoleUpdateParams } from "../types/RoleUpdate";

const initialState: UsersReducerState = {
    users: [],
    loading: false
}

export const fetchAllUsers = createAsyncThunk(
    "users/getAllUsers",
    async () => {
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/users')
            if (!response.data) {
                throw new Error("Could not retreive users")
            }
            return response.data
        } catch (e) {
            const error = e as Error
            return error.message
        }
    }
)

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id : number) => {
        try {
            const response = await axios.delete<boolean>(`https://api.escuelajs.co/api/v1/users/${id}`)
            if (!response.data) {
                throw new Error("Could not delete user")
            }
            return id
        } catch (e) {
            const error = e as Error
            return error.message
        }
    }
)

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (params : UserUpdateParams) => {
        try {
            const response = await axios.put(
                `https://api.escuelajs.co/api/v1/users/${params.id}`,
                params.update
            )
            console.log(response)
            if (!response.data.name) {
                throw new Error("Could not update user")
            }
            return response.data
        } catch (e) {
            const error = e as Error
            return error.message
        }
    }
)

export const updateUserRole = createAsyncThunk(
    "users/updateUserRole",
    async (params : RoleUpdateParams) => {
        try {
            const response = await axios.put(
                `https://api.escuelajs.co/api/v1/users/${params.id}`,
                { "role" : params.role }
            )
            if (!response.data.name) {
                throw new Error("Could not update user role")
            }
            return response.data
        } catch (e) {
            const error = e as Error
            return error.message
        }
    }
)

export const createUser = createAsyncThunk(
    "users/createUser",
    async (user : NewUser) => {
        try {
            const response = await axios.post(`https://api.escuelajs.co/api/v1/users/`, user)
            if (!response.data) {
                throw new Error("Could not add user")
            }
            return response.data
        } catch (e) {
            const error = e as Error
            return error.message
        }
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            if(action.payload instanceof Error) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.message
                }
            }
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        }),
        builder.addCase(fetchAllUsers.pending, (state, action) => {
            return {
                ...state,
                loading: true
            }
        }),
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.message
                }  
            }
        }),
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            if (typeof action.payload === "number") {
                state.users = state.users.filter(p => p.id !== action.payload)
            }
        }),
        builder.addCase(deleteUser.rejected, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.message
                }
            }
        }),
        builder.addCase(updateUser.fulfilled, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    error: action.payload.message
                }
            }
            state.users.map(p => p.id === action.payload.id ? action.payload : p)
        }),
        builder.addCase(updateUser.rejected, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.message
                }
            }
        }),
        builder.addCase(updateUserRole.fulfilled, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    error: action.payload.message
                }
            }
            state.users.map(p => p.id === action.payload.id ? action.payload : p)
        }),
        builder.addCase(updateUserRole.rejected, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.message
                }
            }
        }),
        builder.addCase(createUser.fulfilled, (state, action) => {
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    error: action.payload.message
                }
            }
            state.users.push(action.payload)
        }),
        builder.addCase(createUser.rejected, (state, action) => {
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

const userReducer = userSlice.reducer
export default userReducer