const knex = require('../database/knex')

class DishRepository {
  async findById(id) {
    const dishId = await knex('dishes').where({ id }).first()

    return dishId
  }

  async findByTitle(title) {
    const dishData = await knex('dishes').where({ title }).first()
    return dishData
  }

  async create({ title, price, category, description, ingredients, image }) {
    let dishId = await knex('dishes').insert({
      title,
      price,
      description,
      image
    })

    dishId = dishId[0]

    const categoryInsert = {
      dish_id: dishId,
      name: category
    }

    await knex('category').insert(categoryInsert)

    const ingredientsArray = ingredients.split(',').map((ingredient) => ingredient.trim())  

    const ingredientsInsert = ingredientsArray.map((ingredient) => {
      return {
        dish_id: dishId,
        name: ingredient
      }
    })

    await knex('ingredients').insert(ingredientsInsert)

    return dishId
  }

  async update({ id, title, price, category, description, ingredients }) {
    await knex('dishes')
      .where({ id })
      .update({ title, price, description, updated_at: knex.fn.now() });
    
    const categoryUpdated = {
      dish_id: id,
      name: category
    }
  
    await knex('category').where({ dish_id: id }).delete();
    await knex('category').insert(categoryUpdated);
  
    const ingredientsUpdated = ingredients.map((ing) => {
      return {
        dish_id: id,
        name: ing.name
      }
    })
  
    await knex('ingredients').where({ dish_id: id }).delete();
    await knex('ingredients').insert(ingredientsUpdated);
  }
  
  async show({ id }) {
    const dish = await knex('dishes').where({ id }).first()

    const category = await knex('category')
      .select('id', 'name')
      .where({ dish_id: id })
      .orderBy('name')

    const ingredients = await knex('ingredients')
      .select('id', 'name')
      .where({ dish_id: id })
      .orderBy('name')

    return { dish, category, ingredients }
  }

  async index({ title, category, ingredients }) {
    let ingredientsFiltered
    let filteredByTitle
    let filteredByCategory
    let defaultDish

    let searchDish = knex('dishes')
      .select('dishes.id', 'dishes.title', 'dishes.description', 'dishes.price', 'dishes.image')
      .innerJoin('category', 'category.dish_id', 'dishes.id')
      .groupBy('dishes.id')
      .orderBy('dishes.title')
      
    if (ingredients) {
      const filterIngredients = ingredients.split(',').map((ingredient) => ingredient.trim())
      
      ingredientsFiltered = await searchDish
        .innerJoin('ingredients', 'ingredients.dish_id', 'dishes.id')
        .where((builder) => {
          filterIngredients.forEach((ingredient) => {
            builder.whereLike('ingredients.name', `%${ingredient}%`)
        })
      })
    }

    if (title) filteredByTitle = await searchDish.whereLike('dishes.title', `%${title}%`)
    
    if (category) filteredByCategory = await searchDish.where('category.name', category)

    const filtersMerged = {
      ingredientsFiltered: ingredientsFiltered || [],
      filteredByTitle: filteredByTitle || [],
      filteredByCategory: filteredByCategory || []
    }

    const dishFiltered = [
      ...filtersMerged.ingredientsFiltered,
      ...filtersMerged.filteredByTitle,
      ...filtersMerged.filteredByCategory
    ]

    if(title.length < 1 && ingredients.length < 1) {
      defaultDish = await knex('dishes').select('dishes.id', 'dishes.title', 'dishes.description', 'dishes.price', 'dishes.image')
    }

    const dishValid = title.length < 1 && ingredients.length < 1 ? defaultDish : dishFiltered

    const dishFilteredWithIngredients = dishValid.map(async (dish) => {
      const ingredients = await knex('ingredients')
      .select('dish_id', 'name')
      .whereIn('dish_id', [dish.id])

      const [ categoryByDish ] = await knex('category').select('dish_id', 'name').whereIn('dish_id', [dish.id])
      
      return {...dish, category: categoryByDish.name ,ingredients: [
        ingredients.map(item => item.name)
      ]}
    })
    
    const data = await Promise.all(dishFilteredWithIngredients)
   
    return data
  }

  async delete({ id }) {
    await knex('dishes').where({ id }).delete()
  }

  async updateImage(id, image) {
    await knex('dishes').where({ id }).update({ image })
  }
}

module.exports = DishRepository
