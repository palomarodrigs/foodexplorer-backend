const AppError = require('../utils/AppError')

class CartCreateService {
  constructor(cartRepository, userRepository) {
    this.cartRepository = cartRepository
    this.userRepository = userRepository
  }

  async execute({ user_id, status, paymentMethod, orders }) {
    const userExists = await this.userRepository.findById(user_id)

    if (!userExists) {
      throw new AppError('User not found', 400)
    }

    const cart_id = await this.cartRepository.create({
      user_id,
      status,
      paymentMethod,
      orders
    })

    return cart_id
  }
}

module.exports = CartCreateService
