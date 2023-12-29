import { UserRole } from "./UserRole"

export interface UserRow {
    id: string
	email: string
	name: string
	role: UserRole
}