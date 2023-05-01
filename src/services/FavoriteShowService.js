const AppError = require('../utils/AppError')

class FavoriteShowService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository
  }

  async execute({ id }) {
    const favoriteData = await this.favoriteRepository.show({ id })

    if (!favoriteData) {
      throw new AppError('Favorite not found', 404)
    }

    return favoriteData
  }
}

module.exports = FavoriteShowService
