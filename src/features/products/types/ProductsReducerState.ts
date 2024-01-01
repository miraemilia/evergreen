import { Product } from "./Product";
import { ProductFilter } from "./ProductFilter";

export interface ProductsReducerState {
    products: Product[],
    product: Product | undefined,
    adminProducts: Product[],
    filters: ProductFilter,
    totalProducts: number,
    totalPages: number,
    adminTotalProducts: number,
    priceRange: PriceRange,
    loading: boolean
    error?: string
}

export interface PriceRange {
    min: number,
    max: number
}