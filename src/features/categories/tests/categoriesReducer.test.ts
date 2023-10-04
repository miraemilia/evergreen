import { createStore } from "../../../app/store";
import { fetchAllCategories } from "../reducers/categoriesReducer";
import categoriesServer from "./categoriesServer";

let store = createStore()
beforeEach(() => {store = createStore()})

describe('Categories reducer', () => {
    test('should have empty initial state', () => {
        expect(store.getState().categoriesReducer.categories).toMatchObject([])
    })
    test('should get all categories into store', async () => {
        categoriesServer.listen()
        categoriesServer.resetHandlers()
        await store.dispatch(fetchAllCategories())
        const stateCategories = store.getState().categoriesReducer.categories
        expect(stateCategories.length).toBe(2)
        categoriesServer.close()
    })
})