const knex = require('../database/knex')

class CartRepository {
  async create({ user_id, status, paymentMethod, orders }) {
    let cart_id = await knex('cart').insert({
      status,
      paymentMethod,
      user_id
    })

    cart_id = cart_id[0]

    const ordersInsert = orders.map((order) => {
      return {
        title: order.title,
        quantity: order.quantity,
        cart_id,
        dish_id: order.id
      }
    })

    await knex('cartItems').insert(ordersInsert)

    return cart_id
  }
}

module.exports = CartRepository
