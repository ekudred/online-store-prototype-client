import API from '../API/index'

export default class ProductService {
  static async getProducts({ type_id, brand_id, limit, skip }) {
    return API.post('/product/get', { type_id, brand_id, limit, skip })
  }

  static async getProduct(product_id) {
    return API.post(`/product/get/${product_id}`)
  }

  static async getRating(product_id) {
    return API.post(`/product/rating/get/${product_id}`)
  }

  static async getRate({ user_id, product_id }) {
    return API.post('/product/rate/get', { user_id, product_id })
  }

  static async findPopular(amount) {
    return API.post('/product/popular/find', { amount })
  }
}
