import { User } from "../../users/types/User"
import { CartItem } from "./CartItem"

export interface Cart {
    id: number
    customer: User
    cartItems: CartItem[]
    checkedOut: boolean
}