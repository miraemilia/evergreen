import { User } from "../../users/types/User";

export interface Credentials {
    user: User
    accessToken: string
    refreshToken: string
}