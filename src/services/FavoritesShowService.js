const AppError = require('../utils/AppError')

class FavoritesShowService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository
  }

  async execute({ user_id, dish_id }) {
    const favorite = await this.favoriteRepository.show({ user_id, dish_id })

    if (!favorite) {
      throw new AppError('Favorite not found.')
    }

    return favorite
  }
}

module.exports = FavoritesShowService
