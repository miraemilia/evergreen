import { OrderStatus } from "./OrderStatus"

export interface OrderUpdate {
    orderStatus: OrderStatus
}

export interface OrderUpdateParams {
    id: string
    update: OrderUpdate
}