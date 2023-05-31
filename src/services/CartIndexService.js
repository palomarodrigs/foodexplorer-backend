class CartIndexService {
  constructor(cartRepository) {
    this.cartRepository = cartRepository
  }

  async execute(user_id) {
    const orders = await this.cartRepository.findByUserId(user_id)
    return orders
  }
}

module.exports = CartIndexService