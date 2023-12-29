export interface ProductRow {
    id: string
    title: ProductRowTitle
    latinName?: string
    price: number
    description: string
    category: string
    inventory: number
}

export interface ProductRowTitle {
    id: string
    title: string
}