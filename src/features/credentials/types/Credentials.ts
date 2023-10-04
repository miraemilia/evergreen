import { User } from "../../users/types/User";

export interface Credentials {
    profile: Partial<User> | undefined
    token: string
    error?: string
}