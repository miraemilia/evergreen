export interface UserUpdate {
    name?: string
    email?: string
    password?: string
    avatar?: string
}

export type UserUpdateParams = {
    id: number,
    update: UserUpdate
}