import { Order } from "./Order"

export interface PageableOrders {
    items: Order[]
    totalItems: number,
    totalPages: number,
    page: number
}