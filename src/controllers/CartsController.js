const UserRepository = require('../repositories/UserRepository')
const CartRepository = require('../repositories/CartRepository')
const CartCreateService = require('../services/CartCreateService')
const CartIndexService = require('../services/CartIndexService')

class CartsController {
  async create(request, response) {
    const { status, paymentMethod, orders } = request.body
    const user_id = request.user.id

    const cartRepository = new CartRepository()
    const userRepository = new UserRepository()
    const cartCreateService = new CartCreateService(cartRepository, userRepository)

    await cartCreateService.execute({ user_id, status, paymentMethod, orders })

    return response.status(201).json()
  }

  async index(request, response) {
    const user_id = request.user.isAdmin ? null : request.user.id

    const cartRepository = new CartRepository()
    const cartIndexService = new CartIndexService(cartRepository)

    const orders = await cartIndexService.execute(user_id)

    return response.json(orders)
  }
}

module.exports = CartsController
