export interface ProductUpdate {
    title?: string
    latinName?: string
    price?: number
    description?: string
    categoryId?: number
}

export type UpdateParams = {
    id: string,
    update: ProductUpdate
}