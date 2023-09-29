import { rest } from "msw"
import { setupServer } from 'msw/node'

import { mockProductData } from "../../features/products/tests/mockProductData"
import { mockUserData } from "../../features/users/tests/mockUserData"

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
]

const server = setupServer(...handlers)

export default server