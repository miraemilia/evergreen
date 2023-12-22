import { Product } from "./Product"

export interface PageableProducts {
    items: Product[]
    totalItems: number,
    totalPages: number,
    page: number
}