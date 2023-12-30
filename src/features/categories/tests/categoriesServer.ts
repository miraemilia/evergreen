import { rest } from "msw"
import { setupServer } from 'msw/node'

import { mockCategories } from "./data/mockCategoryData"
import { CategoryUpdate } from "../types/CategoryUpdate"
import { Category } from "../types/Category"

const baseUrl = 'http://localhost:5180/api/v1/categories'

export const handlers = [
    rest.get(baseUrl, (req, res, ctx) => {
        return res(ctx.json(mockCategories))
    }),
    rest.delete(`${baseUrl}/:id`, async (req, res, ctx) => {
        const { id } = req.params
        if (mockCategories.find(c => c.id == id)) {
            return res(
                ctx.json(true)
            )
        } else {
            return res(
                ctx.json(false)
            )
        }
    }),
    rest.patch(`${baseUrl}/:id`, async (req, res, ctx) => {
        let input : CategoryUpdate = await req.json()
        const { id } = req.params
        const categoryIndex = mockCategories.findIndex(p => p.id === id)
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