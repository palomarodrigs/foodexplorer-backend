const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class DishCreateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute({ title, price, category, description, ingredients, image }) {
    const diskStorage = new DiskStorage()

    const checkDishExists = await this.dishRepository.findByTitle(title)

    if (checkDishExists) {
      throw new AppError('A dish with that title already exists.')
    }

    const filename = await diskStorage.saveFile(image)

    const dishId = await this.dishRepository.create({
      title,
      price,
      category,
      description,
      ingredients,
      image: filename
    })

    return dishId
  }
}

module.exports = DishCreateService
