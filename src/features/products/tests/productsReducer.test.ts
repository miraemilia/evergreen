import { createStore } from "../../../app/store";
import { mockCategories } from "../../categories/tests/data/mockCategoryData";
import productQueries from "../reducers/productQuery";
import { createProduct, deleteProduct, fetchAllProducts, updateProduct } from "../reducers/productsReducer";
import { DetailsOption } from "../types/DetailsOption";
import { NewProduct } from "../types/NewProduct";
import { ProductSize } from "../types/ProductSize";
import { UpdateParams } from "../types/ProductUpdate";
import { mockProductData } from "./data/mockProductData";
import productsServer from "./productsServer";

describe('Products reducer', () => {

    let store = createStore()
    beforeEach(() => {store = createStore()})

    test('should have empty initial state', () => {
        expect(store.getState().productsReducer.products).toMatchObject([])
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
        const stateproducts = store.getState().productsReducer.adminProducts
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
            title: "Alocasia",
            latinName: "Alocasia spp.",
            price: 150000,
            description: "Dramatic tropical houseplant with large, arrow-shaped leaves, adds a touch of drama to your home.",
            category: mockCategories[1],
            productImages: [
              {
                id: "453afde8-5ac9-4ec9-8b46-189d39a22ffe",
                imageUrl: "https://source.unsplash.com/potted-green-snake-plant-on-white-chair-GY6ViMxtmDE"
              }
            ],
            productDetails: {
              size: ProductSize.Medium,
              watering: DetailsOption.Medium,
              light: DetailsOption.High,
              difficulty: DetailsOption.Low,
              hanging: false,
              nonToxic: false,
              airPurifying: false
            },
            inventory: 22
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

    test('should add new product', async () => {
        const newProduct : NewProduct = {
                title: "Rubber duck",
                price: 100,
                description: "Quack, quack!",
                categoryId: "1",
                productImages: [{imageUrl: "https://picsum.photos/id/306/640/640"}],
                inventory: 5
        }
        const result = await store.dispatch(createProduct(newProduct))
        expect(store.getState().productsReducer.products.length).toBe(1)
    })

})