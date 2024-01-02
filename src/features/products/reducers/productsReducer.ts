import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { PriceRange, ProductsReducerState } from "../types/ProductsReducerState";
import { DetailsUpdateParams, InventoryUpdateParams, UpdateParams } from "../types/ProductUpdate";
import { NewProduct } from "../types/NewProduct";
import { ProductFilter } from "../types/ProductFilter";
import { Product } from "../types/Product";
import { PageableProducts } from "../types/PageableProducts";
import { AppState } from "../../../app/store";
import { GetAllParams } from "../../../shared/types/GetAllParams";
import { ProductImage } from "../types/ProductImage";
import { NewProductImage } from "../types/NewProductImage";
import { ProductDetails } from "../types/ProductDetails";

const initialState: ProductsReducerState = {
    products: [],
    product: undefined,
    adminProducts: [],
    filters: { limit: 12, offset: 0, search: undefined, sortOrder: 'desc', sortCriterion: 'createdAt', priceMax: undefined, priceMin: undefined} as ProductFilter,
    totalProducts: 0,
    totalPages: 0,
    adminTotalProducts: 0,
    priceRange: {min: 0, max: 1000},
    loading: false
}

const baseUrl = 'https://evergreenbotanics.azurewebsites.net/api/v1/products'
const imageBaseUrl = 'https://evergreenbotanics.azurewebsites.net/api/v1/images'

export const fetchAllProducts = createAsyncThunk<PageableProducts, GetAllParams, {rejectValue: string}>(
    "products/getAllProducts",
    async (GetAllParams, {rejectWithValue}) => {
        try {
            const response = await axios.get<PageableProducts>(`${baseUrl}/?Limit=${GetAllParams.limit}&Offset=${GetAllParams.offset}`)
            if (!response.data) {
                throw new Error("Could not retreive products")
            }
            if (response.data.items.length < 1) {
                throw new Error("No matches")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            let message = error.message
            if (error.response?.data){
                message = error.response?.data as string
            }
            return rejectWithValue(message)
        }
    }
)

export const fetchOneProduct = createAsyncThunk<Product, string, {rejectValue: string}>(
    "products/getOneProduct",
    async (id : string, {rejectWithValue}) => {
        try {
            const response = await axios.get<Product>(`${baseUrl}/${id}`)
            if (!response.data) {
                throw new Error("Could not retreive products")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            let message = error.message
            if (error.response?.data){
                message = error.response?.data as string
            }
            return rejectWithValue(message)
        }
    }
)

export const fetchProductsWithFilters = createAsyncThunk<PageableProducts, void, {rejectValue: string}>(
    "products/getProductsWithFilters",
    async (_, {rejectWithValue, getState}) => {
        let queryParam = '?'
        const state = getState() as AppState
        const filter = state.productsReducer.filters
        queryParam += `Limit=${filter.limit}&Offset=${filter.offset}&`
        queryParam += `SortOrder=${filter.sortOrder}&SortCriterion=${filter.sortCriterion}&`
        if (filter.id !== undefined){
            queryParam += `Id=${filter.id}&`
        }
        if (filter.search !== undefined)
        {
            queryParam += `Search=${filter.search}&`
        }
        if (filter.priceMax !== undefined)
        {
            queryParam += `PriceMax=${Math.ceil(filter.priceMax)}&`
        }
        if (filter.priceMin !== undefined)
        {
            queryParam += `PriceMin=${Math.floor(filter.priceMin)}&`
        }
        try {
            const response = await axios.get<PageableProducts>(`${baseUrl}/${queryParam}`)
            if (!response.data) {
                throw new Error("Could not retreive products")
            }
            if (response.data.items.length < 1) {
                throw new Error("No matches")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            let message = error.message
            if (error.response?.data){
                message = error.response?.data as string
            }
            return rejectWithValue(message)
        }
    }
)

export const deleteProduct = createAsyncThunk<string, string, {rejectValue:string}>(
    "products/deleteProduct",
    async (id : string, {rejectWithValue, getState}) => {
        try {
            const state = getState() as AppState
            const token = state.credentialsReducer.token
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const response = await axios.delete<boolean>(`${baseUrl}/${id}`, config)
            if (!response.data) {
                throw new Error("Could not delete product")
            }
            return id
        } catch (e) {
            const error = e as AxiosError
            let message = error.message
            if (error.response?.data){
                message = error.response?.data as string
            }
            return rejectWithValue(message)
        }
    }
)

export const deleteProductImage = createAsyncThunk<string, string, {rejectValue:string}>(
    "products/deleteProductImage",
    async (id : string, {rejectWithValue, getState}) => {
        try {
            const state = getState() as AppState
            const token = state.credentialsReducer.token
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const response = await axios.delete<boolean>(`${imageBaseUrl}/${id}`, config)
            if (!response.data) {
                throw new Error("Could not delete image")
            }
            return id
        } catch (e) {
            const error = e as AxiosError
            let message = error.message
            if (error.response?.data){
                message = error.response?.data as string
            }
            return rejectWithValue(message)
        }
    }
)

export const updateProduct = createAsyncThunk<Product, UpdateParams, {rejectValue: string}>(
    "products/updateProduct",
    async (params : UpdateParams, {rejectWithValue, getState} ) => {
        try {
            const state = getState() as AppState
            const token = state.credentialsReducer.token
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const response = await axios.patch<Product>(
                `${baseUrl}/${params.id}`,
                params.update,
                config
            )
            if (!response.data) {
                throw new Error("Could not update product")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            let message = error.message
            if (error.response?.data){
                message = error.response?.data as string
            }
            return rejectWithValue(message)
        }
    }
)

export const updateProductInventory = createAsyncThunk<Product, InventoryUpdateParams, {rejectValue: string}>(
    "products/updateProductInventory",
    async (params : InventoryUpdateParams, {rejectWithValue, getState} ) => {
        try {
            const state = getState() as AppState
            const token = state.credentialsReducer.token
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const response = await axios.patch<Product>(
                `${baseUrl}/inventory/${params.id}`,
                params.update,
                config
            )
            if (!response.data) {
                throw new Error("Could not update product inventory")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            let message = error.message
            if (error.response?.data){
                message = error.response?.data as string
            }
            return rejectWithValue(message)
        }
    }
)

export const updateProductDetails = createAsyncThunk<ProductDetails, DetailsUpdateParams, {rejectValue: string}>(
    "products/updateProductDetails",
    async (params : DetailsUpdateParams, {rejectWithValue, getState} ) => {
        try {
            const state = getState() as AppState
            const token = state.credentialsReducer.token
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const response = await axios.patch<ProductDetails>(
                `${baseUrl}/details/${params.id}`,
                params.update,
                config
            )
            if (!response.data) {
                throw new Error("Could not update product details")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            let message = error.message
            if (error.response?.data){
                message = error.response?.data as string
            }
            return rejectWithValue(message)
        }
    }
)

export const createProduct = createAsyncThunk<Product, NewProduct, {rejectValue: string}>(
    "products/createProduct",
    async (product : NewProduct, {rejectWithValue, getState}) => {
        try {
            const state = getState() as AppState
            const token = state.credentialsReducer.token
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const response = await axios.post<Product>(baseUrl, product, config)
            if (!response.data) {
                throw new Error("Could not add product")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            let message = error.message
            if (error.response?.data){
                message = error.response?.data as string
            }
            return rejectWithValue(message)
        }
    }
)

export const createProductImage = createAsyncThunk<ProductImage, NewProductImage, {rejectValue: string}>(
    "products/createProductImage",
    async (image : NewProductImage, {rejectWithValue, getState}) => {
        try {
            const state = getState() as AppState
            const token = state.credentialsReducer.token
            const config = {
                headers : {
                    "Authorization": `Bearer ${token}`
                }
            }
            const response = await axios.post<ProductImage>(imageBaseUrl, image, config)
            if (!response.data) {
                throw new Error("Could not add image")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            let message = error.message
            if (error.response?.data){
                message = error.response?.data as string
            }
            return rejectWithValue(message)
        }
    }
)

export const fetchPriceRange = createAsyncThunk<PriceRange, void, {rejectValue: string}>(
    "products/getPriceRange",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get<PriceRange>(`${baseUrl}/price-range`)
            if (!response.data) {
                throw new Error("Could not retreive range")
            }
            return response.data
        } catch (e) {
            const error = e as AxiosError
            let message = error.message
            if (error.response?.data){
                message = error.response?.data as string
            }
            return rejectWithValue(message)
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
            return {
                ...state,
                adminProducts: action.payload.items,
                adminTotalProducts: action.payload.totalItems,
                adminTotalPages: action.payload.totalPages,
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
                adminProducts: [],
                loading: false,
                error: error
            }
        })
        builder.addCase(fetchOneProduct.fulfilled, (state, action) => {
            return {
                ...state,
                product: action.payload,
                loading: false,
                error: undefined
            }
        })
        builder.addCase(fetchOneProduct.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: undefined
            }
        })
        builder.addCase(fetchOneProduct.rejected, (state, action) => {
            const error = action.payload as string
            return {
                ...state,
                product: undefined,
                loading: false,
                error: error
            }
        })
        builder.addCase(fetchProductsWithFilters.fulfilled, (state, action) => {
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
        builder.addCase(fetchProductsWithFilters.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: undefined
            }
        })
        builder.addCase(fetchProductsWithFilters.rejected, (state, action) => {
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
        builder.addCase(deleteProductImage.fulfilled, (state, action) => {
            if (state.product){
                state.product.productImages = state.product?.productImages.filter(i => i.id !== action.payload)
            }
        })
        builder.addCase(deleteProductImage.rejected, (state, action) => {
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
        builder.addCase(updateProductInventory.fulfilled, (state, action) => {
            state.product = action.payload
        })
        builder.addCase(updateProductInventory.rejected, (state, action) => {
            state.error = action.payload as string
        })
        builder.addCase(updateProductDetails.fulfilled, (state, action) => {
            if (state.product){
                state.product.productDetails = action.payload
            }
            
        })
        builder.addCase(updateProductDetails.rejected, (state, action) => {
            state.error = action.payload as string
        })
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload)
        })
        builder.addCase(createProduct.rejected, (state, action) => {
            state.error = action.payload as string
        })
        builder.addCase(createProductImage.fulfilled, (state, action) => {
            if (state.product){
                state.product.productImages.push(action.payload)
            }
        })
        builder.addCase(createProductImage.rejected, (state, action) => {
            state.error = action.payload as string
        })
        builder.addCase(fetchPriceRange.fulfilled, (state, action) => {
            return {
                ...state,
                priceRange: action.payload,
                loading: false,
                error: undefined
            }
        })
        builder.addCase(fetchPriceRange.pending, (state, action) => {
            return {
                ...state,
                loading: true,
                error: undefined
            }
        })
        builder.addCase(fetchPriceRange.rejected, (state, action) => {
            const error = action.payload as string
            return {
                ...state,
                product: undefined,
                loading: false,
                error: error
            }
        })
    },
})

const productsReducer = productsSlice.reducer
export const { sortByPrice, setOffset, setLimit, setId, setSearch, setSortOrder, setSortCriterion, setPriceMax, setPriceMin } = productsSlice.actions
export default productsReducer