const { Router } = require('express')
const multer = require('multer')
const multerConfig = require('../configs/upload')

const DishesController = require('../controllers/DishesController')
const dishesController = new DishesController()

const DishImageController = require('../controllers/DishImageUpdateController')
const dishImageController = new DishImageController()

const dishesRouter = Router()
const upload = multer(multerConfig.MULTER)

dishesRouter.post('/', dishesController.create)
dishesRouter.put('/:id', dishesController.update)
dishesRouter.patch('/:id', upload.single('image'), dishImageController.update)
dishesRouter.get('/:id', dishesController.show)

module.exports = dishesRouter
