export interface CategoryUpdate {
    name?: string
    imageUrl?: string
}

export interface CategoryUpdateParams {
    id: string
    update: CategoryUpdate
}