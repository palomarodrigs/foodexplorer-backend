const DishRepository = require('../repositories/DishRepository')
const DishCreateService = require('../services/DishCreateService')

class DishesController {
  async create(request, response) {
    const { title, price, category, description, ingredients } = request.body

    const dishRepository = new DishRepository()
    const dishCreateService = new DishCreateService(dishRepository)

    await dishCreateService.execute({
      title,
      price,
      category,
      description,
      ingredients
    })

    return response.status(201).json()
  }
}

module.exports = DishesController
