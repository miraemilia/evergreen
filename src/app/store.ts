import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "../features/categories/categoriesReducer";
import productsReducer from "../features/products/reducers/productsReducer";
import productQuery from "../features/products/reducers/productQuery";
import usersReducer from "../features/users/reducers/usersReducer";

export const createStore = () => {
    return configureStore({
        reducer: {
            productsReducer,
            categoriesReducer,
            usersReducer,
            [productQuery.reducerPath]: productQuery.reducer
        },
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productQuery.middleware),
    })
}

const store = createStore()

export type AppState = ReturnType<typeof store.getState>
export default store