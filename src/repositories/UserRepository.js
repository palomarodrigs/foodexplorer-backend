const knex = require('../database/knex')

class UserRepository {
  async findByEmail(email) {
    const user = await knex('users').where({ email }).first()

    return user
  }

  async findById(user_id) {
    return await knex('users').where({ id: user_id }).first()
  }

  async create({ name, email, password }) {
    const [userId] = await knex('users').insert({ name, email, password })

    return { id: userId }
  }

  async update({ name, email, password, updated_at, id }) {
    const userId = await knex('users').where({ id }).update({
      name,
      email,
      password,
      updated_at,
      id
    })

    return { id: userId }
  }

  async changeAvatar(userId, avatar) {
    await knex('users').update({ avatar }).where({ id: userId })
  }
}

module.exports = UserRepository
