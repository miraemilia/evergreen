import { UserRole } from "./UserRole"

export interface RoleUpdateParams {
    id: string
    role: UserRole,
    token: string
}