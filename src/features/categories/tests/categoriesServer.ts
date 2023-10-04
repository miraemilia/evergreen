import { rest } from "msw"
import { setupServer } from 'msw/node'

import { mockCategories } from "./data/mockCategoryData"

export const handlers = [
    rest.get('https://api.escuelajs.co/api/v1/categories', (req, res, ctx) => {
        return res(ctx.json(mockCategories))
    })
]

const categoriesServer = setupServer(...handlers)

export default categoriesServer