import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "../features/categories/categoriesReducer";
import productsReducer from "../features/products/reducers/productsReducer";

export const createStore = () => {
    return configureStore({
        reducer: {
            productsReducer,
            categoriesReducer
        }
    })
}

const store = createStore()

export type AppState = ReturnType<typeof store.getState>
export default store