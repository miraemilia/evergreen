import { createStore } from "../../../app/store";
import productsReducer, { createProduct, deleteProduct, fetchAllProducts, fetchWithFilters, sortByPrice, updateProduct } from "../reducers/productsReducer";
import { NewProduct } from "../types/NewProduct";
import { UpdateParams } from "../types/ProductUpdate";
import { ProductsReducerState } from "../types/ProductsReducerState";
import { mockProductData } from "./data/mockProductData";
import productsServer from "./productsServer";

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
        expect(filteredProducts.payload).not.toEqual('No matches')
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

describe('Product reducer: DELETE, PUT, POST', () => {

    let store = createStore()
    beforeEach(() => {store = createStore()})

    beforeAll(() => productsServer.listen())
    afterEach(() => productsServer.resetHandlers())
    afterAll(() => productsServer.close())

    test('should delete existing product', async () => {
        const result = await store.dispatch(deleteProduct(3))
        expect(result.payload).toBe(3)
    })

    test('should return error string when deleting unexisting product', async () => {
        const result = await store.dispatch(deleteProduct(35))
        expect(result.payload).toEqual('Could not delete product')
    })

    test('should update existing product', async () => {
        const updateParams : UpdateParams = {
            id: 2,
            update: {
                price: 150000
            }
        }
        const result = await store.dispatch(updateProduct(updateParams))
        expect(result.payload.price).toBe(150000)
    })

    test('should return error string when updating unexisting product', async () => {
        const updateParams : UpdateParams = {
            id: 99999999,
            update: {title: "New title"}
        }
        const result = await store.dispatch(updateProduct(updateParams))
        expect(result.payload).toEqual("Request failed with status code 400")
    })

    test('should add new product', async () => {
        const newProduct : NewProduct = {
                title: "Rubber duck",
                price: 100,
                description: "Quack, quack!",
                categoryId: 1,
                images: ["https://picsum.photos/id/306/640/640"]
        }
        const result = await store.dispatch(createProduct(newProduct))
        expect(result.payload.title).toEqual("Rubber duck")
        expect(store.getState().productsReducer.products.length).toBe(1)
    })

})