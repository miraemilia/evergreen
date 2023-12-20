import { rest } from "msw"
import { setupServer } from 'msw/node'

import { mockProductData } from "./data/mockProductData"
import { NewProduct } from "../types/NewProduct"
import { Product } from "../types/Product"
import { mockCategories } from "../../categories/tests/data/mockCategoryData"
import { ProductUpdate } from "../types/ProductUpdate"

export const handlers = [
    rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
        const productId = req.url.searchParams.get('categoryId')
        if (!productId) {
            return res(ctx.json(mockProductData))    
        } else {
            const filteredData = mockProductData.filter(p => p.category.id === Number(productId))
            return res(ctx.json(filteredData))
        } 
    }),
    rest.get("https://api.escuelajs.co/api/v1/products/:id", async (req, res, ctx) => {
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
    rest.delete("https://api.escuelajs.co/api/v1/products/:id", async (req, res, ctx) => {
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
    rest.post("https://api.escuelajs.co/api/v1/products", async (req, res, ctx) => {
        const input : NewProduct = await req.json()
        const category = mockCategories.find(c => c.id === input.categoryId)
        if (category) {
            const product : Product = {
                id: "sgnskjgnskne",//mockProductData.length + 1,
                title: input.title,
                description: input.description,
                price: input.price,
                productImages: [],
                category
            }
            return res(ctx.json(product))
        } else {
            return res(
                ctx.status(400)
            )
        }
    }),
    rest.put("https://api.escuelajs.co/api/v1/products/:id", async (req, res, ctx) => {
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