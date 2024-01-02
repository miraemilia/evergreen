import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { AppState } from "../../../app/store";
import { OrdersReducerState } from "../types/OrdersReducerState";
import { PageableOrders } from "../types/PageableOrders";
import { Order } from "../types/Order";
import { OrderUpdateParams } from "../types/OrderUpdateParams";
import { NewOrder } from "../types/NewOrder";
import { GetAllParams } from "../../../shared/types/GetAllParams";

const initialState: OrdersReducerState = {
    orders: [],
    limit: 100,
    offset: 0,
    totalOrders: 0,
    totalPages: 0,
    page: 1,
    loading: false
}

const baseUrl = 'https://evergreenbotanics.azurewebsites.net/api/v1/orders'

export const fetchAllOrders = createAsyncThunk<PageableOrders, GetAllParams, { rejectValue : string}>(
    "orders/getAllOrders",
    async (GetAllParams, {rejectWithValue, getState}) => {
        try {
            const state = getState() as AppState
            const token = state.credentialsReducer.token
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const response = await axios.get(`${baseUrl}/?Limit=${GetAllParams.limit}`, config)
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

export const deleteOrder = createAsyncThunk<string, string, {rejectValue:string}>(
    "orders/deleteOrder",
    async (id : string, {rejectWithValue}) => {
        try {
            const response = await axios.delete<boolean>(`${baseUrl}/${id}`)
            if (!response.data) {
                throw new Error("Could not delete order")
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

export const updateOrderStatus = createAsyncThunk<Order, OrderUpdateParams, {rejectValue: string}>(
    "orders/updateOrderStatus",
    async (params : OrderUpdateParams, {rejectWithValue, getState } ) => {
        try {
            const state = getState() as AppState
            const token = state.credentialsReducer.token
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const response = await axios.patch<Order>(
                `${baseUrl}/${params.id}`,
                params.update,
                config
            )
            if (!response.data) {
                throw new Error("Could not update order")
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

export const createOrder = createAsyncThunk<Order, NewOrder, {rejectValue: string}>(
    "orders/createOrder",
    async (order : NewOrder, {rejectWithValue, getState}) => {
        try {
            const state = getState() as AppState
            const token = state.credentialsReducer.token
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const response = await axios.post<Order>(baseUrl, order, config)
            if (!response.data) {
                throw new Error("Could not add order")
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

const ordersSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload
            state.offset = 0
        },
        setOffset: (state, action: PayloadAction<number>) => {
            state.offset = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
            return {
                ...state,
                orders: action.payload.items,
                totalOrders: action.payload.totalItems,
                totalPages: action.payload.totalPages,
                loading: false,
                error: undefined
            }

        })
        builder.addCase(fetchAllOrders.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchAllOrders.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            state.orders = state.orders.filter(p => p.id !== action.payload)
        })
        builder.addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
            const catIndex = state.orders.findIndex(c => c.id === action.payload.id)
            if (catIndex >= 0) {
                state.orders[catIndex] = action.payload
            }
        })
        builder.addCase(updateOrderStatus.rejected, (state, action) => {
            state.error = action.payload as string
        })
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.orders.push(action.payload)
        })
        builder.addCase(createOrder.rejected, (state, action) => {
            state.error = action.payload as string
        })
    },
})

const ordersReducer = ordersSlice.reducer
export default ordersReducer