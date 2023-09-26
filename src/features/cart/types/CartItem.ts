import { Product } from "../../products/types/Product"

export interface CartItem {
    product: Product
	quantity: number
}