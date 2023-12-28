import { User } from "../../users/types/User"
import { OrderDetails } from "./OrderDetails"
import { OrderStatus } from "./OrderStatus"

export interface Order {
    id: string
    user: User
    orderStatus: OrderStatus
    orderDetails: OrderDetails[]
    createdAt: Date
}