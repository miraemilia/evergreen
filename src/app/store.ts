import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "../features/categories/reducers/categoriesReducer";
import productsReducer from "../features/products/reducers/productsReducer";
import productQuery from "../features/products/reducers/productQuery";
import usersReducer from "../features/users/reducers/usersReducer";
import cartReducer from "../features/cart/reducers/cartReducer";
import credentialsReducer from "../features/credentials/reducers/credentialsReducer";
import ordersReducer from "../features/order/reducers/ordersReducer";

export const createStore = () => {
    return configureStore({
        reducer: {
            productsReducer,
            categoriesReducer,
            usersReducer,
            cartReducer,
            credentialsReducer,
            ordersReducer,
            [productQuery.reducerPath]: productQuery.reducer
        },
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productQuery.middleware),
    })
}

const store = createStore()

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store