const { hash } = require('bcryptjs')

exports.seed = async function (knex) {
  await knex('users').delete()
  await knex('users').insert([
    {
      name: 'Admin',
      email: 'admin@admin.com',
      password: await hash('12345', 8),
      isAdmin: true
    }
  ])
}
