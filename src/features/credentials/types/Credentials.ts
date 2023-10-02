import { User } from "../../users/types/User";

export interface Credentials {
    profile: Partial<User> | undefined
    tokens: Tokens | undefined
    error?: string
}

export interface Tokens {
    access_token: string
    refresh_token: string  
}