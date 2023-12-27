export interface UserUpdate {
    name?: string
    email?: string
    avatar?: string
}

export type UserUpdateParams = {
    id: number,
    update: UserUpdate
}

export interface PasswordUpdate {
    password: string
}

export type PasswordUpdateParams = {
    id: number,
    update: PasswordUpdate
}
