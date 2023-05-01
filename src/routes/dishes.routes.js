const { Router } = require('express')
const multer = require('multer')
const multerConfig = require('../configs/upload')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const ensureUserIsAdmin = require('../middlewares/ensureUserIsAdmin')

const DishesController = require('../controllers/DishesController')
const dishesController = new DishesController()

const DishImageController = require('../controllers/DishImageUpdateController')
const dishImageController = new DishImageController()

const dishesRouter = Router()
const upload = multer(multerConfig.MULTER)

dishesRouter.use(ensureAuthenticated)

dishesRouter.post('/', ensureUserIsAdmin, dishesController.create)
dishesRouter.put('/:id', ensureUserIsAdmin, dishesController.update)
dishesRouter.patch('/:id', ensureUserIsAdmin, upload.single('image'), dishImageController.update)
dishesRouter.get('/:id', dishesController.show)
dishesRouter.get('/', dishesController.index)
dishesRouter.delete('/:id', ensureUserIsAdmin, dishesController.delete)

module.exports = dishesRouter
