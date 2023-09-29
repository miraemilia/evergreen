import { mockProductData } from "../../products/tests/mockProductData";
import { Cart } from "../types/Cart";

export const mockCart1 : Cart = {
    cartItems: [
        { 
            product: mockProductData[0],
            quantity: 1
        },
        {
            product: mockProductData[1],
            quantity: 5
        }
    ],
    checkedOut: false
}