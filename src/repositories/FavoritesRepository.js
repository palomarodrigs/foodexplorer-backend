const knex = require('../database/knex')

class FavoritesRepository {
  async findById({ user_id, dish_id }) {
    const favoriteId = await knex('favorites').where({ user_id }).where({ dish_id }).first()
    return favoriteId
  }

  async create({ user_id, dish_id }) {
    const favoriteCreated = await knex('favorites').insert({
      user_id,
      dish_id
    })

    return favoriteCreated
  }

  async show({ user_id, dish_id }) {
    const favorite = await knex('favorites').where({ user_id }).where({ dish_id }).first()
    return favorite
  }
}

module.exports = FavoritesRepository
