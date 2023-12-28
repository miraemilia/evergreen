import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { LoginParams } from "../types/LoginParams";
import { Credentials } from "../types/Credentials";
import { User } from "../../users/types/User";
import { UserProfile } from "../types/UserProfile";

const initialState : Credentials = {
    token: '',
    profile: undefined
}

export const login = createAsyncThunk<string, LoginParams, {rejectValue: string}>(
    "credentials/login",
    async (params, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post('http://localhost:5180/api/v1/auth/login', params)
            const token = response.data
            const profileResponse = await dispatch(getProfile(token))
            if (typeof profileResponse === 'string' || !profileResponse.payload) {
                throw Error('Could not log in')
            } else {
                return token
            }
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

export const getProfile = createAsyncThunk<UserProfile, string, {rejectValue: string}>(
    'credentials/getProfile',
    async (token, { rejectWithValue }) => {
        try {
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const profileResponse = await axios.get('http://localhost:5180/api/v1/auth/profile', config)
            return profileResponse.data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

const credentialsSlice = createSlice({
    name: 'credentials',
    initialState,
    reducers: {
        logout: (state, action: PayloadAction) =>
        state = initialState 
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload
        })
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload
        })
        builder.addCase(getProfile.fulfilled, (state, action) => {
            console.log(action.payload)
            state.profile = action.payload
        })
        builder.addCase(getProfile.rejected, (state, action) => {
            state.error = action.payload
        })
    }
})

const credentialsReducer = credentialsSlice.reducer
export const { logout } = credentialsSlice.actions
export default credentialsReducer