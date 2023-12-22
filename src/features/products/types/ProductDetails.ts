import { DetailsOption } from "./DetailsOption"
import { Product } from "./Product"
import { ProductSize } from "./ProductSize"

export interface ProductDetails {
    size: ProductSize
    watering: DetailsOption
    light: DetailsOption
    difficulty: DetailsOption
    hanging?: boolean
    nonToxic?: boolean
    airPurifying?: boolean
}