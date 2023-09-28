import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "../features/categories/categoriesReducer";
import productsReducer from "../features/products/reducers/productsReducer";
import productQuery from "../features/products/reducers/productQuery";

export const createStore = () => {
    return configureStore({
        reducer: {
            productsReducer,
            categoriesReducer,
            [productQuery.reducerPath]: productQuery.reducer
        },
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productQuery.middleware),
    })
}

const store = createStore()

export type AppState = ReturnType<typeof store.getState>
export default store