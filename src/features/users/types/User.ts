import { UserRole } from "./UserRole"

export interface User {
    id: string
	email: string
	name: string
	role: UserRole
	avatar?: string
}