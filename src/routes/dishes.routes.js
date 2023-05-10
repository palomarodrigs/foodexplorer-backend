const { Router } = require('express')
const multer = require('multer')
const multerConfig = require('../configs/upload')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const ensureUserIsAdmin = require('../middlewares/ensureUserIsAdmin')

const DishesController = require('../controllers/DishesController')
const dishesController = new DishesController()

const DishImageUpdateController = require('../controllers/DishImageUpdateController')
const dishImageUpdateController = new DishImageUpdateController()

const dishesRoutes = Router()
const upload = multer(multerConfig.MULTER)

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post('/', ensureUserIsAdmin, upload.single('image'), dishesController.create)
dishesRoutes.put('/:id', ensureUserIsAdmin, dishesController.update)
dishesRoutes.patch(
  '/:id',
  ensureUserIsAdmin,
  upload.single('image'),
  dishImageUpdateController.update
)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.delete('/:id', ensureUserIsAdmin, dishesController.delete)

module.exports = dishesRoutes
