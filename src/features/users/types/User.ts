import { UserRole } from "./UserRole"

export interface User {
    id: number
	email: string
	name: string
	role: UserRole
	avatar?: string
}