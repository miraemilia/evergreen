export interface ProductUpdate {
    title?: string
    price?: number
    description?: string
    category?: number
}

export type UpdateParams = {
    id: number,
    update: ProductUpdate
}