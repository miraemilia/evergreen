import { createStore } from "../../../app/store"
import credentialsReducer, { login, logout } from "../reducers/credentialsReducer"
import { Credentials } from "../types/Credentials"

describe('Login tests', () => {
})

describe('Logout tests', () => {

    test('should have empty state after logout', () => {
        const state : Credentials = {
            tokens: {
                access_token: 'setsejtsjtoe',
                refresh_token: 'rgndkgndkfgnd'
            },
            profile: {
                id: 1,
                email: 'profile@mail.com',
                name: 'Jane',
                avatar: 'pic.pgn',
                role: 'customer'
            }
        }
        const credentials = credentialsReducer(state, logout())
    })

})