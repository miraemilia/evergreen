import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { LoginParams } from "../types/LoginParams";
import { Credentials } from "../types/Credentials";
import { User } from "../../users/types/User";

const initialState : Credentials = {
    token: '',
    profile: undefined
}

export const login = createAsyncThunk<string, LoginParams, {rejectValue: string}>(
    "credentials/login",
    async (params, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', params)
            const { access_token } = response.data
            const profileResponse = await dispatch(getProfile(access_token))
            if (typeof profileResponse === 'string' || !profileResponse.payload) {
                throw Error('Could not log in')
            } else {
                return access_token
            }
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

export const getProfile = createAsyncThunk<Partial<User>, string, {rejectValue: string}>(
    'credentials/getProfile',
    async (token, { rejectWithValue }) => {
        try {
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const profileResponse = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', config)
            return profileResponse.data
        } catch (e) {
            const error = e as Error
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