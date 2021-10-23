import API from '../API/index'

export default class AuthService {
    static async registration({ username, email, password }) {
        return API.post('/auth/registration', { username, email, password })
    }

    static async login({ username, password }) {
        return API.post('/auth/login', { username, password })
    }

    static async logout() {
        return API.post('/auth/logout')
    }
}
