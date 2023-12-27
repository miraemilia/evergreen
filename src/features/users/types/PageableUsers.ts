import { User } from "./User"

export interface PageableUsers {
    items: User[]
    totalItems: number,
    totalPages: number,
    page: number
}