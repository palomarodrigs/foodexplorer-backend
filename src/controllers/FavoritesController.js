const FavoritesRepository = require('../repositories/FavoritesRepository')
const FavoriteCreateService = require('../services/FavoriteCreateService')
const FavoriteShowService = require('../services/FavoriteShowService')
const FavoriteDeleteService = require('../services/FavoriteDeleteService')

class FavoritesController {
  async create(request, response) {
    const user_id = request.user.id
    const { dish_id } = request.params

    const favoritesRepository = new FavoritesRepository()
    const favoriteCreateService = new FavoriteCreateService(favoritesRepository)

    await favoriteCreateService.execute({ user_id, dish_id })

    return response.status(201).json()
  }

  async show(request, response) {
    const { id } = request.params

    const favoritesRepository = new FavoritesRepository()
    const favoriteShowService = new FavoriteShowService(favoritesRepository)

    const favorite = await favoriteShowService.execute({ id })

    return response.json(favorite)
  }

  async delete(request, response) {
    const { id } = request.params

    const favoritesRepository = new FavoritesRepository()
    const favoriteDeleteService = new FavoriteDeleteService(favoritesRepository)

    await favoriteDeleteService.execute({ id })

    return response.json()
  }
}

module.exports = FavoritesController
