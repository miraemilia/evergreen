import { Category } from "../../categories/types/Category"
import { ProductDetails } from "./ProductDetails"
import { ProductImage } from "./ProductImage"

export interface Product {
    id: string
    title: string
    latinName?: string
    price: number
    description: string
    category: Category
    productImages: ProductImage[]
    productDetails?: ProductDetails
    inventory: number
}