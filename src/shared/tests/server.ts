import { rest } from "msw"
import { setupServer } from 'msw/node'

import { mockProductData } from "../../features/products/tests/data/mockProductData"
import { mockUserData } from "../../features/users/tests/data/mockUserData"
import { NewProduct } from "../../features/products/types/NewProduct"
import { Product } from "../../features/products/types/Product"
import { mockCategories } from "../../features/categories/tests/data/mockCategoryData"
import { ProductUpdate } from "../../features/products/types/ProductUpdate"
import { NewUser } from "../../features/users/types/NewUser"
import { User } from "../../features/users/types/User"
import { UserUpdate } from "../../features/users/types/UserUpdate"

export const handlers = [
    rest.delete("https://api.escuelajs.co/api/v1/products/:id", async (req, res, ctx) => {
        const { id } = req.params
        if (mockProductData.find(p => p.id == Number(id))) {
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
                id: mockProductData.length + 1,
                title: input.title,
                description: input.description,
                price: input.price,
                images: [],
                category
            }
            return res(ctx.json(product))
        } else {
            ctx.status(400)
        }
    }),
    rest.put("https://api.escuelajs.co/api/v1/products/:id", async (req, res, ctx) => {
        let input : ProductUpdate = await req.json()
        const { id } = req.params
        const productIndex = mockProductData.findIndex(p => p.id === Number(id))
        if (productIndex > -1) {
                const updatedProduct : Product = {
                    ...mockProductData[productIndex],
                    ...input
                }
                return res(ctx.json(updatedProduct))
        } else {
            return res(ctx.status(400))
        }
    }),
    rest.delete("https://api.escuelajs.co/api/v1/users/:id", async (req, res, ctx) => {
        const { id } = req.params
        if (mockUserData.find(u => u.id == Number(id))) {
            return res(
                ctx.json(true)
            )
        } else {
            return res(
                ctx.json(false)
            )
        }
    }),
    rest.post("https://api.escuelajs.co/api/v1/users", async (req, res, ctx) => {
        const input : NewUser = await req.json()
        const user : User = {
                id: mockUserData.length +1,
                name: input.name,
                email: input.email,
                role: "customer"
        }
        return res(ctx.json(user))
    }),
    rest.put("https://api.escuelajs.co/api/v1/users/:id", async (req, res, ctx) => {
        const input : UserUpdate = await req.json()
        const { id } = req.params
        const userIndex = mockUserData.findIndex(u => u.id === Number(id))
        if (userIndex > -1) {
                const updatedUser : User = {
                    ...mockUserData[userIndex],
                    ...input
                }
                return res(ctx.json(updatedUser))
        } else {
            return res(ctx.status(400))
        }
    }),
    rest.post("https://api.escuelajs.co/api/v1/users/is-available", async (req, res, ctx) => {
        const email = await req.json()
        const emailFound = mockUserData.find(u => u.email === email)
        if (emailFound) {
            return res(
                ctx.json({isAvailable: false})
            )
        } else {
            return res(
                ctx.json({isAvailable: true})
            )
        }
    })
]

const server = setupServer(...handlers)

export default server