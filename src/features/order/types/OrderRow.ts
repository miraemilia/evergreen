import { OrderStatus } from "./OrderStatus"

export interface OrderRow {
    id: string
    createdAt: string
    customer: string
    status: OrderStatus
    total: string
}