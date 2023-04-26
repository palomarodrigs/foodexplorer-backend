const AppError = require('../utils/AppError')

class DishCreateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute({ title, price, category, description, ingredients }) {
    const checkDishExists = await this.dishRepository.findByTitle(title)

    if (checkDishExists) {
      throw new AppError('A dish with that title already exists.')
    } else {
      const dish_id = await this.dishRepository.create({
        title,
        price,
        category,
        description,
        ingredients
      })

      return dish_id
    }
  }
}

module.exports = DishCreateService
