const AppError = require('../utils/AppError')

class FavoriteDeleteService {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository
  }

  async execute({ id }) {
    const favorite = await this.favoritesRepository.findByFavoriteId({ id })

    if (!favorite) {
      throw new AppError('Favorite not found', 404)
    } else {
      await this.favoritesRepository.delete({ id })
    }
  }
}

module.exports = FavoriteDeleteService
