import { rest } from "msw"
import { setupServer } from 'msw/node'

import { mockUserData } from "./data/mockUserData"
import { NewUser } from "../types/NewUser"
import { User } from "../types/User"
import { UserUpdate } from "../types/UserUpdate"
import { UserRole } from "../types/UserRole"
import { PageableUsers } from "../types/PageableUsers"

const baseUrl = 'http://localhost:5180/api/v1/users'
const profileBaseUrl = 'http://localhost:5180/api/v1/auth/profile/'

export const handlers = [
    rest.get(`${baseUrl}`, (req, res, ctx) => {
        const mockResponse : PageableUsers = {items: mockUserData, totalItems: mockUserData.length, totalPages: 1, page: 1}
        return res(ctx.json(mockResponse))
    }),
    rest.delete(`${baseUrl}/:id`, async (req, res, ctx) => {
        const { id } = req.params
        if (mockUserData.find(u => u.id == id)) {
            return res(
                ctx.json(true)
            )
        } else {
            return res(
                ctx.json(false)
            )
        }
    }),
    rest.post(profileBaseUrl, async (req, res, ctx) => {
        const input : NewUser = await req.json()
        const user : User = {
                id: (mockUserData.length +1).toString(),
                name: input.name,
                email: input.email,
                role: UserRole.Customer
        }
        return res(ctx.json(user))
    }),
    rest.patch(`${profileBaseUrl}`, async (req, res, ctx) => {
        const input : UserUpdate = await req.json()
        const id = req.headers.get("Authorization")?.slice(-1)
        const userIndex = mockUserData.findIndex(u => u.id === id)
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
    rest.patch(`${baseUrl}/:id`, async (req, res, ctx) => {
        const input : UserUpdate = await req.json()
        const { id } = req.params
        const userIndex = mockUserData.findIndex(u => u.id === id)
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
/*     rest.post("https://api.escuelajs.co/api/v1/users/is-available", async (req, res, ctx) => {
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
    }) */
]

const usersServer = setupServer(...handlers)

export default usersServer