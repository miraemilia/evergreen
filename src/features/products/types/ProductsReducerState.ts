import { Product } from "./Product";

export interface ProductsReducerState {
    products: Product[]
    loading: boolean
    error?: string
}