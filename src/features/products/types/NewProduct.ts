import { NewProductImage } from "./NewProductImage"
import { ProductDetails } from "./ProductDetails"

export interface NewProduct {
    title: string
    latinName?: string
    price: number
    description: string
    categoryId: string
    productImages: NewProductImage[]
    productDetails?: ProductDetails
    inventory: number
}