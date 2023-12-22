import { Product } from "./Product";
import { ProductFilter } from "./ProductFilter";

export interface ProductsReducerState {
    products: Product[]
    filters: ProductFilter,
    totalProducts: number,
    totalPages: number,
    page: number,
    priceMax: number,
    priceMin: number,
    loading: boolean
    error?: string
}