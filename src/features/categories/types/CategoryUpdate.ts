export interface CategoryUpdate {
    name?: string
    image?: string
}

export interface CategoryUpdateParams {
    id: number
    update: CategoryUpdate
}