const DiskStorage = require('../providers/DiskStorage')
const AppError = require('../utils/AppError')

class DishImageUpdateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async execute({ id, imageFilename }) {
    const diskStorage = new DiskStorage()

    const dish = await this.dishRepository.findById(id)

    if (!dish) {
      throw new AppError('Dish not found!')
    }
    
    if (imageFilename) {
      if (dish.image) {
        await diskStorage.deleteFile(dish.image);
      }
  
      const filename = await diskStorage.saveFile(imageFilename);
      dish.image = filename;
  
      await this.dishRepository.updateImage(dish.id, imageFilename);
    }
  }
}

module.exports = DishImageUpdateService
