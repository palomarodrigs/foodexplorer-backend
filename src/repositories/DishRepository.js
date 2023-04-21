const knex = require('../database/knex')

class DishRepository {
  async createDish({ title, price, category, description, ingredients }) {
    let dishId = await knex('dishes').insert({
      title,
      price,
      description
    })

    dishId = dishId[0]

    const categoryInsert = {
      dish_id: dishId,
      name: category
    }

    await knex('category').insert(categoryInsert)

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        dish_id: dishId,
        name: ingredient
      }
    })

    await knex('ingredients').insert(ingredientsInsert)

    return dishId
  }

  async findByTitle(title) {
    const titleId = await knex('dishes').where({ title }).first()

    return titleId
  }
}

module.exports = DishRepository
