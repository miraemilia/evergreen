import { createStore } from "../../../app/store"
import { UserRole } from "../../users/types/UserRole"
import credentialsReducer, { getProfile, login, logout } from "../reducers/credentialsReducer"
import { Credentials } from "../types/Credentials"
import { LoginParams } from "../types/LoginParams"
import credentialsServer from "./credentialsServer"

describe('Login tests', () => {

    let store = createStore()
    beforeEach(() => {store = createStore()})

    beforeAll(() => credentialsServer.listen())
    afterEach(() => credentialsServer.resetHandlers())
    afterAll(() => credentialsServer.close())

    test('should login', async () => {
        const loginParams : LoginParams = {
            email: "maria@mail.com",
            password: "12345"
        }
        await store.dispatch(login(loginParams))
        const credentials = store.getState().credentialsReducer
        expect(credentials.profile?.name).toEqual("Maria")        
    })

    test('should not login with wrong password', async () => {
        const loginParams : LoginParams = {
            email: "maria@mail.com",
            password: "1234"
        }
        await store.dispatch(login(loginParams))
        const credentials = store.getState().credentialsReducer
        expect(credentials.error).toEqual('Request failed with status code 401')
        expect(credentials.token).toEqual("")      
    })

    test('should get profile', async () => {
        const token = 'my-token-2'
        await store.dispatch(getProfile(token))
        const credentials = store.getState().credentialsReducer
        expect(credentials.profile?.name).toEqual("Maria")        
    })

})

describe('Logout tests', () => {

    test('should have empty state after logout', () => {
        const state : Credentials = {
            token: 'segsuegnosen',
            profile: {
                id: "1",
                email: 'profile@mail.com',
                name: 'Jane',
                avatar: 'pic.pgn',
                role: UserRole.Customer,
                orders: []
            }
        }
        const credentials = credentialsReducer(state, logout())
    })

})