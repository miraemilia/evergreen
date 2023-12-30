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
    priceMax: number,
    priceMin: number,
    loading: boolean
    error?: string
}