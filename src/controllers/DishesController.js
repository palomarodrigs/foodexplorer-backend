const DishRepository = require('../repositories/DishRepository')
const DishCreateService = require('../services/DishCreateService')
const DishUpdateService = require('../services/DishUpdateService')
const DishShowService = require('../services/DishShowService')
const DishIndexService = require('../services/DishIndexService')
const DishDeleteService = require('../services/DishDeleteService')

class DishesController {
  async create(request, response) {
    const { title, price, category, description, ingredients } = request.body
    const image = request.file

    const dishRepository = new DishRepository()
    const dishCreateService = new DishCreateService(dishRepository)

    await dishCreateService.execute({
      title,
      price,
      category,
      description,
      ingredients,
      image
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

  async show(request, response) {
    const { id } = request.params

    const dishRepository = new DishRepository()
    const dishShowService = new DishShowService(dishRepository)

    const dishData = await dishShowService.execute({ id })

    return response.json(dishData)
  }

  async index(request, response) {
    const { title, category, ingredients } = request.query

    const dishRepository = new DishRepository()
    const dishIndexService = new DishIndexService(dishRepository)

    const dishData = await dishIndexService.execute({ title, category, ingredients })

    return response.json(dishData)
  }

  async delete(request, response) {
    const { id } = request.params

    const dishRepository = new DishRepository()
    const dishDeleteService = new DishDeleteService(dishRepository)

    await dishDeleteService.execute({ id })

    response.status(201).json()
  }
}

module.exports = DishesController
