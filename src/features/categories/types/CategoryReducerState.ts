import { Category } from "./Category"

export interface CategoryReducerState {
    categories: Category[]
    error?: string
    loading: boolean
}