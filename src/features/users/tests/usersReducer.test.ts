import { createStore } from "../../../app/store"
import usersServer from "./usersServer"
import { createUser, deleteUser, fetchAllUsers, updateUser, updateUserRole } from "../reducers/usersReducer"
import { NewUser } from "../types/NewUser"
import { RoleUpdateParams } from "../types/RoleUpdate"
import { UserUpdateParams } from "../types/UserUpdate"
import { UserRole } from "../types/UserRole"

describe('Users reducer: GET', () => {

    let store = createStore()
    beforeEach(() => {store = createStore()})

    test('should have empty initial state', () => {
        expect(store.getState().usersReducer.users).toMatchObject([])
    })
    
})

describe('User reducer: DELETE, PUT, POST', () => {

    let store = createStore()
    beforeEach(() => {store = createStore()})

    beforeAll(() => usersServer.listen())
    afterEach(() => usersServer.resetHandlers())
    afterAll(() => usersServer.close())

    test('should get all users into store', async () => {
        await store.dispatch(fetchAllUsers({limit: 20, offset: 0, token: 'my-token'}))
        const stateUsers = store.getState().usersReducer.users
        expect(stateUsers.length).toBe(3)
    })

    test('should delete existing user', async () => {
        const result = await store.dispatch(deleteUser({id: "1", token: "my-token"}))
        expect(result.payload).toBe("1")
    })

    test('should return error string when deleting unexisting user', async () => {
        const result = await store.dispatch(deleteUser({id: "10", token: "my-token"}))
        expect(result.payload).toEqual('Could not delete user')
    })

    test('should update existing user', async () => {
            const updateParams : UserUpdateParams = {
                update: {
                    name: "John",
                },
                token: 'my-token-1'
            }
            const result = await store.dispatch(updateUser(updateParams))
            expect(result.payload).toMatchObject(
                {
                    id: "1",
                    email: "john@mail.com",
                    name: "John",
                    role: UserRole.Customer,
                    avatar: "https://i.imgur.com/fpT4052.jpeg"
                }
            )
    })

    test('should return error string when updating unexisting user', async () => {
        const updateParams : UserUpdateParams = {
            update: {name: "John"},
            token: 'my-token-9'
        }
        const result = await store.dispatch(updateUser(updateParams))
        expect(result.payload).toEqual("Request failed with status code 400")
    })

    test('should update user role', async () => {
        const updateParams : RoleUpdateParams = {
            id: "2",
            role: UserRole.Admin,
            token: "admin-token"
        }
        const result = await store.dispatch(updateUserRole(updateParams))
        expect(result.payload).toMatchObject({
                id: "2",
                email: "maria@mail.com",
                name: "Maria",
                role: "Admin",
                avatar: "https://i.imgur.com/uDpzwEk.jpeg"
        })
    })

    test('should add new user', async () => {
            const newUser : NewUser = {
                    name: "Rubber duck",
                    email: "duck@quack.com",
                    password: "quaaack123",
                    avatar: "https://picsum.photos/id/306/640/640",
            }
            const result = await store.dispatch(createUser(newUser))
            expect(store.getState().usersReducer.users.length).toBe(1)
        })

})