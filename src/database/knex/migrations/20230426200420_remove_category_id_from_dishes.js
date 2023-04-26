exports.up = function (knex) {
  return knex.schema.table('dishes', function (table) {
    table.dropColumn('category_id')
  })
}

exports.down = function (knex) {
  return knex.schema.table('dishes', function (table) {
    table.integer('category_id').references('id').inTable('category')
  })
}
