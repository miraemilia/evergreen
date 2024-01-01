import { rest } from "msw"
import { setupServer } from 'msw/node'

import { LoginParams } from "../types/LoginParams"
import { User } from "../../users/types/User"
import { mockUserData } from "../../users/tests/data/mockUserData"

const baseUrl = 'http://localhost:5180/api/v1/auth'
const rightPassword = '12345'

export const handlers = [
    rest.post(`${baseUrl}/login`, async (req, res, ctx) => {
        const input : LoginParams = await req.json()
        if (input.password === rightPassword){
            return res(ctx.json('my-token-2'))
        } else {
            return res(ctx.status(401))
        }
    }),
    rest.get(`${baseUrl}/profile`, async (req, res, ctx) => {
        const id = req.headers.get("Authorization")?.slice(-1)
        const userIndex = mockUserData.findIndex(u => u.id === id)
        if (userIndex > -1) {
                const user : User = {
                    ...mockUserData[userIndex]                }
                return res(ctx.json(user))
        } else {
            return res(ctx.status(400))
        }
    })
]

const credentialsServer = setupServer(...handlers)

export default credentialsServer