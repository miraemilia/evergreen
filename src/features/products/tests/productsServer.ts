import { rest } from "msw"
import { setupServer } from 'msw/node'

import { mockProductData } from "./data/mockProductData"
import { NewProduct } from "../types/NewProduct"
import { Product } from "../types/Product"
import { mockCategories } from "../../categories/tests/data/mockCategoryData"
import { ProductUpdate } from "../types/ProductUpdate"
import { PageableProducts } from "../types/PageableProducts"

const baseUrl = 'https://evergreenbotanics.azurewebsites.net/api/v1/products'

export const handlers = [
    rest.get(baseUrl, (req, res, ctx) => {
        const mockResponse : PageableProducts = {items: mockProductData, totalItems: mockProductData.length, totalPages: 1, page: 1}
        return res(ctx.json(mockResponse))
    }),
    rest.get(`${baseUrl}/:id`, async (req, res, ctx) => {
        const { id } = req.params
        const product = mockProductData.find(c => c.id === id)
        if (product) {
            return res(ctx.json(product))
        } else {
            return res(
                ctx.status(400),
                ctx.json({name: "EntityNotFoundError"})
            )
        }
    }),
    rest.delete(`${baseUrl}/:id`, async (req, res, ctx) => {
        const { id } = req.params
        if (mockProductData.find(p => p.id == id)) {
            return res(
                ctx.json(true)
            )
        } else {
            return res(
                ctx.json(false)
            )
        }
    }),
    rest.post(`${baseUrl}`, async (req, res, ctx) => {
        const input : NewProduct = await req.json()
        const category = mockCategories.find(c => c.id === input.categoryId)
        if (category) {
            const product : Product = {
                id: (mockProductData.length + 1).toString(),
                title: input.title,
                description: input.description,
                price: input.price,
                productImages: [],
                category,
                inventory: input.inventory
            }
            return res(ctx.json(product))
        } else {
            return res(
                ctx.status(400)
            )
        }
    }),
    rest.patch(`${baseUrl}/:id`, async (req, res, ctx) => {
        let input : ProductUpdate = await req.json()
        const { id } = req.params
        const productIndex = mockProductData.findIndex(p => p.id === id)
        if (productIndex > -1) {
                const updatedProduct : Product = {
                    ...mockProductData[productIndex],
                    ...input
                }
                return res(ctx.json(updatedProduct))
        } else {
            return res(ctx.status(400))
        }
    })
]

const productsServer = setupServer(...handlers)

export default productsServer