const knex = require('../database/knex')

class CartRepository {
  async findByUserId(user_id) {
    const isAdmin = await knex("users")
      .where("id", user_id)
      .select("isAdmin")
      .first()
      .then((user) => user.isAdmin);

    let orders;

    if (isAdmin) {
      orders = await knex("cart")
        .select([
          "cart.id",
          "cart.user_id",
          "cart.status",
          "cart.paymentMethod",
          "cart.created_at",
        ])
        .groupBy("cart.id");
    } else {
      orders = await knex("cart")
        .select([
          "cart.id",
          "cart.user_id",
          "cart.status",
          "cart.paymentMethod",
          "cart.created_at",
        ])
        .where("cart.user_id", user_id)
        .groupBy("cart.id");
    }

    const cartItems = await knex("cartItems");
    const cartWithItems = orders.map((order) => {
      const cartItem = cartItems.filter((item) => item.cart_id === order.id);

      return {
        ...order,
        items: cartItem,
      };
    });

    return cartWithItems;
  }
  
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
