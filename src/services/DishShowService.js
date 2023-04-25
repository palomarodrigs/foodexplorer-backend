const AppError = require('../utils/AppError')

class DishShowService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute({ id }) {
    const { dish, category, ingredients } = await this.dishRepository.show({ id })

    if (!dish) {
      throw new AppError('Dish not found.')
    }

    return { ...dish, category, ingredients }
  }
}

module.exports = DishShowService
