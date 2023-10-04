import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Credentials } from "../types/Credentials";
import { LoginParams } from "../types/LoginParams";

const initialState : Credentials = {
    token: '',
    profile: undefined
}

export const login = createAsyncThunk<Credentials, LoginParams, {rejectValue: string}>(
    "credentials/login",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', params)
            const { access_token } = response.data
            try {
                const config = {
                    headers : {
                        "Authorization": `Bearer ${access_token}`
                    }
                }
                const profileResponse = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', config)
                const credentials : Credentials = { 
                    profile: profileResponse.data,
                    token: access_token
                }
                return credentials
            } catch (e) {
                const error = e as Error
                return rejectWithValue(error.message)
            }
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
            state.profile = action.payload.profile
            state.token = action.payload.token
        })
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload
        })
    }
})

const credentialsReducer = credentialsSlice.reducer
export const { logout } = credentialsSlice.actions
export default credentialsReducer