const FavoritesCreateService = require('../services/FavoritesCreateService')
const FavoritesRepository = require('../repositories/FavoritesRepository')

class FavoritesController {
  async create(request, response) {
    const { dish_id } = request.params

    const user_id = request.user.id

    const favoritesRepository = new FavoritesRepository()
    const favoritesCreateService = new FavoritesCreateService(favoritesRepository)

    await favoritesCreateService.execute({ user_id, dish_id })

    return response.status(201).json()
  }
}

module.exports = FavoritesController
