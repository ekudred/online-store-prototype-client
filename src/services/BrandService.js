import API from '../API/index'

export default class BrandService {
  // static async create(name) {
  //   return API.post('/brand/create', { name })
  // }

  static async getAll() {
    return API.post('/brand/get')
  }
}
