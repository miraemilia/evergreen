import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { ProductsReducerState } from "../types/ProductsReducerState";
import { UpdateParams } from "../types/ProductUpdate";
import { NewProduct } from "../types/NewProduct";
import { ProductFilter } from "../types/ProductFilter";
import { Product } from "../types/Product";
import { PageableProducts } from "../types/PageableProducts";
import { AppState } from "../../../app/store";

const initialState: ProductsReducerState = {
    products: [],
    filters: { limit: 12, offset: 0, search: undefined, sortOrder: 'desc', sortCriterion: 'createdAt', priceMax: undefined, priceMin: undefined} as ProductFilter,
    totalProducts: 0,
    totalPages: 0,
    page: 1,
    priceMax: 0,
    priceMin: 0,
    loading: false
}


export const fetchAllProducts = createAsyncThunk<PageableProducts, void, {rejectValue: string}>(
    "products/getAllProducts",
    async (_, {rejectWithValue, getState}) => {
        let queryParam = '?'
        const state = getState() as AppState
        const filter = state.productsReducer.filters
        queryParam += `Limit=${filter.limit}&Offset=${filter.offset}&`
        if (filter.id !== undefined){
            queryParam += `Id=${filter.id}&`
        }
        if (filter.search !== undefined)
        {
            queryParam += `Search=${filter.search}&`
        }
        if (filter.priceMax !== undefined)
        {
            queryParam += `PriceMax=${filter.priceMax}&`
        }
        if (filter.priceMin !== undefined)
        {
            queryParam += `PriceMin=${filter.priceMin}&`
        }
        try {
            const response = await axios.get<PageableProducts>(`http://localhost:5180/api/v1/products${queryParam}`)
            console.log(response)
            if (!response.data) {
                throw new Error("Could not retreive products")
            }
            if (response.data.items.length < 1) {
                throw new Error("No matches")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

/* export const fetchWithFilters = createAsyncThunk<PageableProducts, ProductFilter[], {rejectValue: string}>(
    "products/getFiltered",
    async (filters : ProductFilter[], {rejectWithValue}) => {
        let queryParam = '?'
        filters.forEach(f =>
            queryParam += `${f.name}=${f.value}&`
        )
        try {
            const response = await axios.get<PageableProducts>(`https://api.escuelajs.co/api/v1/products/${queryParam}`)
            if (!response.data) {
                throw new Error("Could not retreive products")
            }
            if (response.data.items.length < 1) {
                throw new Error("No matches")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
) */

export const deleteProduct = createAsyncThunk<string, string, {rejectValue:string}>(
    "products/deleteProduct",
    async (id : string, {rejectWithValue}) => {
        try {
            const response = await axios.delete<boolean>(`https://api.escuelajs.co/api/v1/products/${id}`)
            if (!response.data) {
                throw new Error("Could not delete product")
            }
            return id
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

export const updateProduct = createAsyncThunk<Product, UpdateParams, {rejectValue: string}>(
    "products/updateProduct",
    async (params : UpdateParams, {rejectWithValue} ) => {
        try {
            const response = await axios.put<Product>(
                `https://api.escuelajs.co/api/v1/products/${params.id}`,
                params.update
            )
            if (!response.data) {
                throw new Error("Could not update product")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

export const createProduct = createAsyncThunk<Product, NewProduct, {rejectValue: string}>(
    "products/createProduct",
    async (product : NewProduct, {rejectWithValue}) => {
        try {
            const response = await axios.post<Product>("https://api.escuelajs.co/api/v1/products/", product)
            if (!response.data) {
                throw new Error("Could not add product")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        sortByPrice: (state, action: PayloadAction<'asc' | 'desc'>) => {
            if (action.payload === 'asc') {
                state.products.sort((a, b) => a.price - b.price)
            } else {
                state.products.sort((a, b) => b.price - a.price)
            }
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.filters.limit = action.payload
            state.filters.offset = 0
        },
        setOffset: (state, action: PayloadAction<number>) => {
            state.filters.offset = action.payload
        },
        setId: (state, action: PayloadAction<string | undefined>) => {
            state.filters.id = action.payload
            state.filters.offset = 0
        },
        setSearch: (state, action: PayloadAction<string | undefined>) => {
            state.filters.search = action.payload
            state.filters.offset = 0
        },
        setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.filters.sortOrder = action.payload
            state.filters.offset = 0
        },
        setSortCriterion: (state, action: PayloadAction<'price' | 'createdAt'>) => {
            state.filters.sortCriterion = action.payload
            state.filters.offset = 0
        },
        setPriceMax: (state, action: PayloadAction<number | undefined>) => {
            state.filters.priceMax = action.payload
            state.filters.offset = 0
        },
        setPriceMin: (state, action: PayloadAction<number | undefined>) => {
            state.filters.priceMin = action.payload
            state.filters.offset = 0
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            console.log(action.payload)
            return {
                ...state,
                products: action.payload.items,
                totalProducts: action.payload.totalItems,
                totalPages: action.payload.totalPages,
                page: action.payload.page,
                loading: false,
                error: undefined
            }
        })
        builder.addCase(fetchAllProducts.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: undefined
            }
        })
        builder.addCase(fetchAllProducts.rejected, (state, action) => {
            const error = action.payload as string
            return {
                ...state,
                products: [],
                totalProducts: 0,
                totalPages: 0,
                loading: false,
                error: error
            }
        })
/*         builder.addCase(fetchWithFilters.fulfilled, (state, action) => {
            return {
                ...state,
                products: action.payload.items,
                totalProducts: action.payload.totalItems,
                totalPages: action.payload.pages,
                loading: false,
                error: undefined
            }
        })
        builder.addCase(fetchWithFilters.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: undefined
            }
        })
        builder.addCase(fetchWithFilters.rejected, (state, action) => {
            const error = action.payload as string
            return {
                ...state,
                products: [],
                loading: false,
                error: error
            }
        }) */
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter(p => p.id !== action.payload)
        })
        builder.addCase(deleteProduct.rejected, (state, action) => {
            const error = action.payload as string
            return {
                ...state,
                loading: false,
                error
            }
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.products.map(p => p.id === action.payload.id ? action.payload : p)
        })
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.error = action.payload as string
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload)
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.error = action.payload as string
        })
    },
})

const productsReducer = productsSlice.reducer
export const { sortByPrice, setOffset, setLimit, setId, setSearch, setSortOrder, setSortCriterion, setPriceMax, setPriceMin } = productsSlice.actions
export default productsReducer