import { rest } from "msw"
import { setupServer } from 'msw/node'

import { mockCategories } from "./data/mockCategoryData"
import { CategoryUpdate } from "../types/CategoryUpdate"
import { Category } from "../types/Category"

export const handlers = [
    rest.get('https://api.escuelajs.co/api/v1/categories', (req, res, ctx) => {
        return res(ctx.json(mockCategories))
    }),
    rest.delete("https://api.escuelajs.co/api/v1/categories/:id", async (req, res, ctx) => {
        const { id } = req.params
        if (mockCategories.find(c => c.id == Number(id))) {
            return res(
                ctx.json(true)
            )
        } else {
            return res(
                ctx.json(false)
            )
        }
    }),
    rest.put("https://api.escuelajs.co/api/v1/categories/:id", async (req, res, ctx) => {
        let input : CategoryUpdate = await req.json()
        const { id } = req.params
        const categoryIndex = mockCategories.findIndex(p => p.id === Number(id))
        if (categoryIndex > -1) {
                const updatedCategory : Category = {
                    ...mockCategories[categoryIndex],
                    ...input
                }
                return res(ctx.json(updatedCategory))
        } else {
            return res(ctx.status(400))
        }
    })
]

const categoriesServer = setupServer(...handlers)

export default categoriesServer