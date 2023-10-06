export interface ProductFilter {
    name: "title" | "price_min" | "price_max" | "categoryId"
    value: number | string
}