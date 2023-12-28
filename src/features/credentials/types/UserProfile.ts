import { Order } from "../../order/types/Order"
import { UserRole } from "../../users/types/UserRole"

export interface UserProfile {
    id: number
	email: string
	name: string
	role: UserRole
	avatar?: string
	orders: Order[]
}