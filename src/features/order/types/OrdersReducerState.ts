import { Order } from "./Order"

export interface OrdersReducerState {
    orders: Order[]
    limit: number,
    offset: number,
    totalOrders: number,
    totalPages: number,
    page: number,
    loading: boolean
    error?: string
}