export interface UserUpdate {
    name?: string
    email?: string
    avatar?: string
}

export type UserUpdateParams = {
    id: string,
    update: UserUpdate
}

export interface PasswordUpdate {
    password: string
}

export type PasswordUpdateParams = {
    id: string,
    update: PasswordUpdate
}
