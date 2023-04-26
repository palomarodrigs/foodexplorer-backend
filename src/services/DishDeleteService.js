const AppError = require('../utils/AppError')

class DishDeleteService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute({ id }) {
    const dish = await this.dishRepository.findById(id)

    if (!dish) {
      throw new AppError('Dish not found!')
    }

    await this.dishRepository.delete({ id })
  }
}

module.exports = DishDeleteService
