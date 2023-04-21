exports.up = function (knex) {
  return knex.schema.table('dishes', function (table) {
    table.dropColumn('category')
  })
}

exports.down = function (knex) {
  return knex.schema.table('dishes', function (table) {
    table.text('category')
  })
}
