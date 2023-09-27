import { createStore } from "../../../app/store";
import productsReducer, { deleteProduct, fetchAllProducts, sortByPrice } from "../reducers/productsReducer";
import { Product } from "../types/Product";
import { ProductsReducerState } from "../types/ProductsReducerState";
import { mockProductData } from "./mockProductData";
import server from "./server";

describe('Products reducer: GET', () => {

    let store = createStore()
    beforeEach(() => {store = createStore()})

    test('should have empty initial state', () => {
        expect(store.getState().productsReducer.products).toMatchObject([])
    })

    test('should not be empty after fetching', async () => {
        await store.dispatch(fetchAllProducts())
        expect(store.getState().productsReducer.products.length).toBeGreaterThan(0)
    })

    test('should get all products into store', async () => {
        const apiproducts = await store.dispatch(fetchAllProducts())
        const stateproducts = store.getState().productsReducer.products
        expect(stateproducts.length).toBe(apiproducts.payload.length)
    })

})

describe('Products reducer: sort', () => {

    const mockProducts = mockProductData
    
    const state: ProductsReducerState = {
            products: mockProducts,
            loading: false,
            error: ''
    }

    test('should sort products by price in ascending order', () => {
        const sortedProducts = productsReducer(state, sortByPrice('asc')).products
        expect(sortedProducts[0]).toBe(mockProducts[2])
        expect(sortedProducts[3]).toBe(mockProducts[1])
    })

    test('should sort products by price in ascending order', () => {
        const sortedProducts = productsReducer(state, sortByPrice('desc')).products
        expect(sortedProducts[0]).toBe(mockProducts[1])
        expect(sortedProducts[3]).toBe(mockProducts[2])
    })

})

describe('Product reducer: DELETE', () => {

    let store = createStore()
    beforeEach(() => {store = createStore()})

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test('should delete existing product', async () => {
        const result = await store.dispatch(deleteProduct(35))
        expect(result.payload).toBe(35)
    })

    test('should return error string when deleting unexisting product', async () => {
        const result = await store.dispatch(deleteProduct(1))
        expect(result.payload).toEqual('Could not delete product')
    })

})