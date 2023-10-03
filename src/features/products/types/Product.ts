import { Category } from "../../categories/types/Category"

export interface Product {
    id: number
    title: string
    price: number
    description: string
    images: string[]
    category: Category
}