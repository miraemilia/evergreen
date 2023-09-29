import { User } from "./User";

export interface UsersReducerState {
    users: User[]
    loading: boolean
    error?: string
}