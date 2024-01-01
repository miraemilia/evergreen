import { User } from "./User";

export interface UsersReducerState {
    users: User[],
    totalUsers: number,
    loading: boolean
    error?: string
}