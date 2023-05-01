const AppError = require('../utils/AppError')

class FavoritesCreateService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository
  }

  async execute({ user_id, dish_id }) {
    const checkFavorite = await this.favoritesRepository.findById({ user_id, dish_id })

    if (checkFavorite) {
      throw new AppError('This dish has already been added to my favorites.')
    }

    const favoriteCreated = await this.favoritesRepository.create({ user_id, dish_id })

    return favoriteCreated
  }
}

module.exports = FavoritesCreateService
