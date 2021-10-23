import API from '../API/index'

export default class UserService {
  static getUsers({ skip, limit }) {
    return API.post('/user/get_users', { skip, limit })
  }
}
