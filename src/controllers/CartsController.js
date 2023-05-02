const UserRepository = require('../repositories/UserRepository')
const CartRepository = require('../repositories/CartRepository')
const CartCreateService = require('../services/CartCreateService')

class CartsController {
  async create(request, response) {
    const { status, paymentMethod, orders } = request.body
    const user_id = request.user.id

    const cartRepository = new CartRepository()
    const userRepository = new UserRepository()
    const cartCreateService = new CartCreateService(cartRepository, userRepository)

    await cartCreateService.execute({ user_id, status, paymentMethod, orders })

    response.status(201).json()
  }
}

module.exports = CartsController
