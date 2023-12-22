import { createStore } from "../../../app/store";
import { deleteCategory, fetchAllCategories, updateCategory } from "../reducers/categoriesReducer";
import { CategoryUpdateParams } from "../types/CategoryUpdate";
import categoriesServer from "./categoriesServer";

let store = createStore()

describe('Categories reducer', () => {

    beforeAll(() => categoriesServer.listen())
    afterEach(() => categoriesServer.resetHandlers())
    afterAll(() => categoriesServer.close())

    test('should have empty initial state', () => {
        expect(store.getState().categoriesReducer.categories).toMatchObject([])
    })
    test('should get all categories into store', async () => {
        await store.dispatch(fetchAllCategories())
        const stateCategories = store.getState().categoriesReducer.categories
        expect(stateCategories.length).toBe(3)
    })

    test('should delete existing product', async () => {
        const result = await store.dispatch(deleteCategory('3'))
        expect(result.payload).toBe(3)
    })

    test('should return error string when deleting unexisting product', async () => {
        const result = await store.dispatch(deleteCategory('30'))
        expect(result.payload).toEqual('Could not delete category')
    })

    test('should update existing product', async () => {
        const updateParams : CategoryUpdateParams = {
            id: '2',
            update: {
                name: 'Appliances'
            }
        }
        const result = await store.dispatch(updateCategory(updateParams))
        expect(result.payload).toMatchObject({
            id: 2,
            name: 'Appliances',
            image: 'image2.png'
            })
    })

    test('should return error string when updating unexisting product', async () => {
        const updateParams : CategoryUpdateParams = {
            id: '99999999',
            update: {name: 'New name'}
        }
        const result = await store.dispatch(updateCategory(updateParams))
        expect(result.payload).toEqual("Request failed with status code 400")
    })
})