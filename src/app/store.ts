import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "../features/categories/categoriesReducer";

export const createStore = () => {
    return configureStore({
        reducer: {
            categoriesReducer
        }
    })
}

const store = createStore()

export type AppState = ReturnType<typeof store.getState>
export default store