const knex = require('../database/knex')

class UserRepository {
  async findByEmail(email) {
    const user = await knex('users').where({ email }).first()

    return user
  }

  async create({ name, email, password }) {
    const userId = await knex('users').insert({ name, email, password })

    return { id: userId }
  }

  async findById(id) {
    const userData = await knex('users').where({ id }).first()

    return userData
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

  async changeAvatar(avatar, id) {
    const userAvatar = await knex('users').where({ id }).update({ avatar })

    return userAvatar
  }
}

module.exports = UserRepository
