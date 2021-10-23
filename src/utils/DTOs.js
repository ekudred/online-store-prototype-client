export class User {
  _id
  basket
  username
  email
  avatar
  role
  isActivated

  constructor(model) {
    this._id = model._id
    this.basket = model.basket
    this.username = model.username
    this.email = model.email
    this.avatar = model.avatar
    this.role = model.role[0]
    this.isActivated = model.isActivated
  }
}

export class Product {
  _id
  name
  type
  brand
  price
  img

  constructor(model) {
    this._id = model._id
    this.name = model.name
    this.type = model.type.name
    this.brand = model.brand.name
    this.price = model.price
    this.img = model.img
  }
}

export class Type {
  _id
  name

  constructor(model) {
    this._id = model._id
    this.name = model.name
  }
}

export class Brand {
  _id
  name

  constructor(model) {
    this._id = model._id
    this.name = model.name
  }
}
