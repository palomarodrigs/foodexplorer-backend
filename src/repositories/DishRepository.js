const knex = require('../database/knex')

class DishRepository {
  async findById(id) {
    const dishData = await knex('dishes').where({ id }).first()

    return dishData
  }

  async findByTitle(title) {
    const titleId = await knex('dishes').where({ title }).first()

    return titleId
  }

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

  async updateDish({ id, title, price, category, description, ingredients }) {
    await knex('dishes')
      .where({ id })
      .update({ title, price, description, updated_at: knex.fn.now() })

    const categoryUpdated = {
      name: category,
      dish_id: id
    }

    await knex('category').where({ dish_id: id }).delete()
    await knex('category').insert(categoryUpdated)

    const ingredientsUpdated = ingredients.map((ing) => {
      return {
        name: ing.name,
        dish_id: id
      }
    })

    await knex('ingredients').where({ dish_id: id }).delete()
    await knex('ingredients').insert(ingredientsUpdated)
  }

  async updateImage(id, image) {
    await knex('dishes').where({ id }).update({ image })
  }
}

module.exports = DishRepository
