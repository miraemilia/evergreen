import { createStore } from "../../../app/store";
import { mockCategories } from "../../categories/tests/data/mockCategoryData";
import productQueries from "../reducers/productQuery";
import productsReducer, { createProduct, deleteProduct, fetchAllProducts, sortByPrice, updateProduct } from "../reducers/productsReducer";
import { NewProduct } from "../types/NewProduct";
import { ProductFilter } from "../types/ProductFilter";
import { UpdateParams } from "../types/ProductUpdate";
import { ProductsReducerState } from "../types/ProductsReducerState";
import { mockProductData } from "./data/mockProductData";
import productsServer from "./productsServer";

describe('Products reducer', () => {

    let store = createStore()
    beforeEach(() => {store = createStore()})

    test('should have empty initial state', () => {
        expect(store.getState().productsReducer.products).toMatchObject([])
    })

})

describe('Products reducer: sort', () => {

    const mockProducts = mockProductData
    
    const state: ProductsReducerState = {
            products: mockProducts,
            product: mockProducts[1],
            adminProducts: [],
            filters: <ProductFilter>{ limit: 12, offset: 0 },
            totalProducts: 45,
            totalPages: 3,
            adminTotalProducts: 45,
            priceMax: 100,
            priceMin: 0,
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

describe('Product reducer: GET, DELETE, PUT, POST', () => {

    let store = createStore()
    beforeEach(() => {store = createStore()})

    beforeAll(() => productsServer.listen())
    afterEach(() => productsServer.resetHandlers())
    afterAll(() => productsServer.close())

    test('should get all products into store', async () => {
        await store.dispatch(fetchAllProducts({limit: 40, offset: 0}))
        const stateproducts = store.getState().productsReducer.products
        expect(stateproducts.length).toBe(4)
    })

    test('should get one product', async () => {
        const result = await store.dispatch(productQueries.endpoints.fetchOne.initiate("3"))
        expect(result.data).toEqual(mockProductData[2])
    })

    test('should return error string when getting unexisting product', async () => {
        const result = await store.dispatch(productQueries.endpoints.fetchOne.initiate("799"))
        expect(result.error).toHaveProperty("data", {name: "EntityNotFoundError"})
    })

/*     test('should filter', async () => {
        await store.dispatch(fetchWithFilters([{name: "categoryId", value: 1}]))
        const products = store.getState().productsReducer.products
        expect(products.length).toBe(1)
    }) */

    test('should delete existing product', async () => {
        const result = await store.dispatch(deleteProduct("3"))
        expect(result.payload).toBe("3")
    })

    test('should return error string when deleting unexisting product', async () => {
        const result = await store.dispatch(deleteProduct("35"))
        expect(result.payload).toEqual('Could not delete product')
    })

    test('should update existing product', async () => {
        const updateParams : UpdateParams = {
            id: "2",
            update: {
                price: 150000
            }
        }
        const result = await store.dispatch(updateProduct(updateParams))
        expect(result.payload).toMatchObject({
            id: "2",
            title: "Handcrafted Soft Computer",
            price: 150000,
            description: "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
            productImages: [
                {
                    id: "w54t89htuij",
                    imageUrl: "https://picsum.photos/640/640?r=7332"
                },
                {
                    id: "w5yt98gjejg",
                    imageUrl: "https://picsum.photos/640/640?r=9493"
                },
                {
                    id: "q3thuifkjng",
                    imageUrl: "https://picsum.photos/640/640?r=1246"
                }
            ],
            category: mockCategories[1]
            })
    })

    test('should return error string when updating unexisting product', async () => {
        const updateParams : UpdateParams = {
            id: "99999999",
            update: {title: "New title"}
        }
        const result = await store.dispatch(updateProduct(updateParams))
        expect(result.payload).toEqual("Request failed with status code 400")
    })

/*     test('should add new product', async () => {
        const newProduct : NewProduct = {
                title: "Rubber duck",
                price: 100,
                description: "Quack, quack!",
                categoryId: "1",
                images: ["https://picsum.photos/id/306/640/640"]
        }
        const result = await store.dispatch(createProduct(newProduct))
        expect(store.getState().productsReducer.products.length).toBe(1)
    }) */

})