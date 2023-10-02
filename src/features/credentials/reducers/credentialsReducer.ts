import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { Credentials, Tokens } from "../types/Credentials";
import { LoginParams } from "../types/LoginParams";

const initialState : Credentials = {
    tokens: undefined,
    profile: undefined
}

export const login = createAsyncThunk(
    "credentials/login",
    async (params : LoginParams) => {
        try {
            const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', params)
            if (!response.data) {
                throw new Error("Could not log in")
            }
            const tokens : Tokens = response.data
            try {
                const config = {
                    headers : {
                        "Authorization": `Bearer ${tokens.access_token}`
                    }
                }
                const profileResponse = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', config)
                if (!profileResponse.data) {
                    throw new Error("Could not log in")
                }
                const credentials : Credentials = { 
                    profile: profileResponse.data,
                    tokens: tokens
                }
                return credentials
            } catch (e) {
                const error = e as Error
                return error
            }
        } catch (e) {
            const error = e as Error
            return error
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
            if (action.payload instanceof Error) {
                return {
                    ...state,
                    error: action.payload.message
                }
            }
            if (!(typeof action.payload !== "string")) {
                state = action.payload
            }
        })
    }
})

const credentialsReducer = credentialsSlice.reducer
export const { logout } = credentialsSlice.actions
export default credentialsReducer