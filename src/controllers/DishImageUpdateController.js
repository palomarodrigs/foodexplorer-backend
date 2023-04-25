const DishRepository = require('../repositories/DishRepository')
const DishImageUpdateService = require('../services/DishImageUpdateService')

class DishImageUpdateController {
  async update(request, response) {
    const { id } = request.params
    const imageFilename = request.file.filename

    const dishRepository = new DishRepository()
    const dishImageUpdateService = new DishImageUpdateService(dishRepository)

    await dishImageUpdateService.execute({ id, imageFilename })

    return response.json(imageFilename)
  }
}

module.exports = DishImageUpdateController
