import API from '../API/index'

export default class BasketService {
  static async getBasket(basket_id) {
    return API.post('/basket/get_basket', { basket_id })
  }

  // static async addProduct({ basket_id, product_id, amount }) {
  //   return API.post('/basket/add', { basket_id, product_id, amount })
  // }

  // static async deleteProduct({ basket_id, product_id }) {
  //   return API.post('/basket/delete', { basket_id, product_id })
  // }

  // static async editProduct({ basket_id, product_id, amount }) {
  //   return API.put('/basket/edit', { basket_id, product_id, amount })
  // }
}
