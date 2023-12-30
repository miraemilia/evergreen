export interface UserUpdate {
    name?: string
    email?: string
    avatar?: string
}

export type UserUpdateParams = {
    update: UserUpdate,
    token: string
}

export interface PasswordUpdate {
    password: string
}

export type PasswordUpdateParams = {
    id: string,
    update: PasswordUpdate
}
