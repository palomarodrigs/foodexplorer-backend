const DishRepository = require('../repositories/DishRepository')
const DishCreateService = require('../services/DishCreateService')
const DishUpdateService = require('../services/DishUpdateService')

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

  async update(request, response) {
    const { title, price, category, description, ingredients } = request.body
    const { id } = request.params

    const dishRepository = new DishRepository()
    const dishUpdateService = new DishUpdateService(dishRepository)

    const dishUpdated = await dishUpdateService.execute({
      id,
      title,
      description,
      category,
      price,
      ingredients
    })

    return response.status(201).json(dishUpdated)
  }
}

module.exports = DishesController
