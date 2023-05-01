const FavoritesRepository = require('../repositories/FavoritesRepository')
const FavoritesCreateService = require('../services/FavoritesCreateService')
const FavoritesShowService = require('../services/FavoritesShowService')

class FavoritesController {
  async create(request, response) {
    const { dish_id } = request.params

    const user_id = request.user.id

    const favoritesRepository = new FavoritesRepository()
    const favoritesCreateService = new FavoritesCreateService(favoritesRepository)

    await favoritesCreateService.execute({ user_id, dish_id })

    return response.status(201).json()
  }

  async show(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.params

    const favoritesRepository = new FavoritesRepository()
    const favoritesShowService = new FavoritesShowService(favoritesRepository)

    const favorite = await favoritesShowService.execute({ user_id, dish_id })

    return response.json(favorite)
  }
}

module.exports = FavoritesController
