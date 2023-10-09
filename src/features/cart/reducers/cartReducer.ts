import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartReducerState } from "../types/CartReducerState";
import { CartItem } from "../types/CartItem";
import { Product } from "../../products/types/Product";
import { CartUpdate } from "../types/CartUpdate";

export const initialState : CartReducerState = {
    cart: {
        cartItems: [],
        checkedOut: false
    }
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartItem: (state, action : PayloadAction<Product>) => {
            if (state.cart.cartItems.length === 0) {
                state.cart.checkedOut = false
            }
            const product: Product = action.payload
            const foundIndex = state.cart.cartItems.findIndex(i => i.product.id === product.id)
            if (foundIndex !== -1) {
                state.cart.cartItems[foundIndex].quantity += 1
            } else {
                const newItem : CartItem = {
                    product: product,
                    quantity: 1
                }
                state.cart.cartItems.push(newItem)  
            }
        },
        updateCartItem: (state, action : PayloadAction<CartUpdate>) => {
            const newQuantity: number = action.payload.quantity
            const foundIndex = state.cart.cartItems.findIndex(i => i.product.id === action.payload.productId)
            if (foundIndex !== -1) {
                if (newQuantity <= 0) {
                    state.cart.cartItems.splice(foundIndex, 1)
                } else {
                    state.cart.cartItems[foundIndex].quantity = newQuantity                    
                }
            }
        },
        deleteCartItem: (state, action : PayloadAction<number>) => {
            const foundIndex = state.cart.cartItems.findIndex(i => i.product.id === action.payload)
            if (foundIndex !== -1) {
                state.cart.cartItems.splice(foundIndex, 1)
            }
        },
        checkoutCart: (state, action : PayloadAction) => {
            state.cart.checkedOut = true
            state.cart.cartItems = []
        },
        resetCart: (state, action : PayloadAction) => {
            state.cart = initialState.cart
        }
    }    
})

const cartReducer = cartSlice.reducer
export const { resetCart, addCartItem, updateCartItem, deleteCartItem, checkoutCart } = cartSlice.actions
export default cartReducer