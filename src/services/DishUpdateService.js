const AppError = require('../utils/AppError')

class DishUpdateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute({ id, title, description, category, price, ingredients }) {
    const dish = await this.dishRepository.findById(id)

    if (!dish) {
      throw new AppError('Dish not found!')
    }

    dish.title = title ?? dish.title
    dish.description = description ?? dish.description
    dish.price = price ?? dish.price
    dish.category = category ?? dish.category

    const updateIngredients = ingredients.map((ing) => {
      return { name: ing }
    })

    dish.ingredients = updateIngredients

    await this.dishRepository.updateDish({
      id,
      title,
      description,
      category,
      price,
      ingredients: updateIngredients
    })
  }
}

module.exports = DishUpdateService
