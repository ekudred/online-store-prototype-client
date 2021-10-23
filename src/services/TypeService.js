import API from '../API/index'

export default class TypeService {
  // static async create(name) {
  //   return API.post('/type/create', { name })
  // }

  static async getAll() {
    return API.post('/type/get')
  }
}
