import { createStore } from "../../../app/store"
import usersServer from "./usersServer"
import { createUser, deleteUser, fetchAllUsers, updateUser, updateUserRole } from "../reducers/usersReducer"
import { NewUser } from "../types/NewUser"
import { RoleUpdateParams } from "../types/RoleUpdate"
import { UserUpdateParams } from "../types/UserUpdate"

describe('Users reducer: GET', () => {

    let store = createStore()
    beforeEach(() => {store = createStore()})

    test('should have empty initial state', () => {
        expect(store.getState().usersReducer.users).toMatchObject([])
    })

    test('should not be empty after fetching', async () => {
        await store.dispatch(fetchAllUsers())
        expect(store.getState().usersReducer.users.length).toBeGreaterThan(0)
    })

    test('should get all users into store', async () => {
        const apiUsers = await store.dispatch(fetchAllUsers())
        const stateUsers = store.getState().usersReducer.users
        expect(stateUsers.length).toBe(apiUsers.payload.length)
    })
    
})

describe('User reducer: DELETE, PUT, POST', () => {

    let store = createStore()
    beforeEach(() => {store = createStore()})

    beforeAll(() => usersServer.listen())
    afterEach(() => usersServer.resetHandlers())
    afterAll(() => usersServer.close())

    test('should delete existing user', async () => {
        const result = await store.dispatch(deleteUser(1))
        expect(result.payload).toBe(1)
    })

    test('should return error string when deleting unexisting user', async () => {
        const result = await store.dispatch(deleteUser(10))
        expect(result.payload).toEqual('Could not delete user')
    })

    test('should update existing user', async () => {
            const updateParams : UserUpdateParams = {
                id: 1,
                update: {
                    name: "John",
                }
            }
            const result = await store.dispatch(updateUser(updateParams))
            expect(result.payload.name).toEqual("John")
    })

    test('should return error string when updating unexisting user', async () => {
        const updateParams : UserUpdateParams = {
            id: 99999999,
            update: {name: "John"}
        }
        const result = await store.dispatch(updateUser(updateParams))
        expect(result.payload).toEqual("Request failed with status code 400")
    })

    test('should update user role', async () => {
        const updateParams : RoleUpdateParams = {
            id: 2,
            role: "admin"
        }
        const result = await store.dispatch(updateUserRole(updateParams))
        expect(result.payload.role).toEqual("admin")
    })

    test('should add new user', async () => {
            const newUser : NewUser = {
                    name: "Rubber duck",
                    email: "duck@quack.com",
                    password: "quaaack123",
                    avatar: "https://picsum.photos/id/306/640/640"
            }
            const result = await store.dispatch(createUser(newUser))
            expect(result.payload.name).toEqual("Rubber duck")
    })

})