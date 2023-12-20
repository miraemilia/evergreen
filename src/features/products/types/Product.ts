import { Category } from "../../categories/types/Category"
import { ProductImage } from "./ProductImage"

export interface Product {
    id: string
    title: string
    price: number
    description: string
    productImages: ProductImage[]
    category: Category
}