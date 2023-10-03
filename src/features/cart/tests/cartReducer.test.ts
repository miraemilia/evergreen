import { mockProductData } from "../../products/tests/data/mockProductData"
import cartReducer, { addCartItem, checkoutCart, deleteCartItem, initialState, resetCart, updateCartItem } from "../reducers/cartReducer"
import { CartReducerState } from "../types/CartReducerState"
import { mockCart1 } from "./mockCartData"

describe('Cart reducer tests', () => {

    test('should have initial state', () => {
        const state = cartReducer(initialState, {
            payload: undefined,
            type: undefined
        })
        expect(state.cart.cartItems.length).toBe(0)
        expect(state.cart.checkedOut).toBeFalsy
    })

    test('should add new item to cart', () => {
        const state : CartReducerState = {cart : mockCart1}
        const cart = cartReducer(state, addCartItem(mockProductData[3]))
        expect(cart.cart.cartItems.length).toBe(3)
    })

    test('should increase quantity of existing cart item', () => {
        const state : CartReducerState = {cart : mockCart1}
        const cart = cartReducer(state, addCartItem(mockProductData[0]))
        expect(cart.cart.cartItems.length).toBe(2)
        expect(cart.cart.cartItems[0].quantity).toBe(2)
    })

    test('should change quantity of existing cart item', () => {
        const state : CartReducerState = {cart : mockCart1}
        const cart = cartReducer(state, updateCartItem({productId: mockProductData[1].id, quantity: 2}))
        expect(cart.cart.cartItems[1].quantity).toBe(2)
    })

    test('should remove cart item if quantity is zero', () => {
        const state : CartReducerState = {cart : mockCart1}
        const cart = cartReducer(state, updateCartItem({productId: mockProductData[1].id, quantity: 0}))
        expect(cart.cart.cartItems.length).toBe(1)
    })

    test('should reset cart', () => {
        const state : CartReducerState = {cart : mockCart1}
        const cart = cartReducer(state, resetCart())
        expect(cart.cart.cartItems.length).toBe(0)
    })

    test('should remove cart item', () => {
        const state : CartReducerState = {cart : mockCart1}
        const cart = cartReducer(state, deleteCartItem(mockProductData[1].id))
        expect(cart.cart.cartItems.length).toBe(1)
    })

    test('should check out cart', () => {
        const state : CartReducerState = {cart : mockCart1}
        const cart = cartReducer(state, checkoutCart())
        expect(cart.cart.checkedOut).toBe(true)
    })
})
