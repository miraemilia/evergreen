import { Cart } from "./Cart";

export interface CartReducerState {
    cart : Cart
    error? : string
}