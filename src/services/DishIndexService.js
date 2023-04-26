const AppError = require('../utils/AppError')

class DishIndexService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute({ title, category, ingredients }) {
    const dishes = await this.dishRepository.index({ title, category, ingredients })

    if (!dishes.length) {
      if (title) {
        throw new AppError(`Dish with title "${title}" not found.`)
      }
      if (category) {
        throw new AppError(`Dish with category "${category}" not found.`)
      }
      if (ingredients) {
        throw new AppError(`Dish with ingredients "${ingredients}" not found.`)
      }
    }

    return dishes
  }
}

module.exports = DishIndexService
