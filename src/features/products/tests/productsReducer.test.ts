import { createStore } from "../../../app/store";
import { useFetchOneQuery } from "../reducers/productQuery";
import productsReducer, { createProduct, deleteProduct, fetchAllProducts, fetchWithFilters, sortByPrice, updateProduct } from "../reducers/productsReducer";
import { NewProduct } from "../types/NewProduct";
import { Product } from "../types/Product";
import { UpdateParams } from "../types/ProductUpdate";
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

    test('should contain less data after filtering', async () => {
        const allProducts = await store.dispatch(fetchAllProducts())
        const filteredProducts = await store.dispatch(fetchWithFilters([{name: "categoryId", value: 1}]))
        expect(filteredProducts.payload.length).toBeLessThan(allProducts.payload.length)
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

// Works with real server, needs mock server:
/* describe('Product reducer: PUT', () => {

    let store = createStore()
    beforeEach(() => {store = createStore()})

    test('should update existing product', async () => {
        const updateParams : UpdateParams = {
            id: 288,
            update: {
                title: "New title",
                price: 150
            }
        }
        const result = await store.dispatch(updateProduct(updateParams))
        expect(result.payload.title).toEqual("New title")
    })

    test('should return error string when updating unexisting product', async () => {
        const updateParams : UpdateParams = {
            id: 99999999,
            update: {title: "New title"}
        }
        const result = await store.dispatch(updateProduct(updateParams))
        expect(result.payload).toEqual("Request failed with status code 400")
    })

}) */

// Works with real server, needs mock server:
/* describe('Product reducer: POST', () => {

    let store = createStore()
    beforeEach(() => {store = createStore()})

    test('should update existing product', async () => {
        const newProduct : NewProduct = {
                title: "Rubber duck",
                price: 100,
                description: "Quack, quack!",
                categoryId: 5,
                images: [https://unsplash.com/photos/VTvnoNBowZs"https://picsum.photos/id/306/640/640"]
        }
        const result = await store.dispatch(createProduct(newProduct))
        expect(result.payload.title).toEqual("Rubber duck")
    })

}) */