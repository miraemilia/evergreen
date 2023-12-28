import { UserProfile } from "./UserProfile"

export interface Credentials {
    profile: UserProfile | undefined
    token: string
    error?: string
}