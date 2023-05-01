const knex = require('../database/knex')

class FavoritesRepository {
  async findById({ user_id, dish_id }) {
    const favoriteId = await knex('favorites').where({ user_id }).where({ dish_id }).first()
    return favoriteId
  }

  async findByFavoriteId({ id }) {
    const favorite = await knex('favorites').where({ id }).first()
    return favorite
  }

  async create({ user_id, dish_id }) {
    const favoriteCreated = await knex('favorites').insert({
      user_id,
      dish_id
    })

    return favoriteCreated
  }

  async show({ id }) {
    const showFavorite = await knex('favorites').where({ id }).first()
    return showFavorite
  }

  async delete({ id }) {
    await knex('favorites').where({ id }).delete()
  }
}

module.exports = FavoritesRepository
