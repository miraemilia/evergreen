import { createStore } from "../../../app/store";
import { fetchAllCategories } from "../reducers/categoriesReducer";

let store = createStore()
beforeEach(() => {store = createStore()})

describe('Categories reducer', () => {
    test('should have empty initial state', () => {
        expect(store.getState().categoriesReducer.categories).toMatchObject([])
    })
    test('should not be empty after fetching', async () => {
        await store.dispatch(fetchAllCategories())
        expect(store.getState().categoriesReducer.categories.length).toBeGreaterThan(0)
    })
    test('should get all categories into store', async () => {
        const apiCategories = await store.dispatch(fetchAllCategories())
        const stateCategories = store.getState().categoriesReducer.categories
        expect(stateCategories.length).toBe(apiCategories.payload.length)
    })
})