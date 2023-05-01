const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const FavoritesController = require('../controllers/FavoritesController')
const favoritesController = new FavoritesController()

const favoritesRouter = Router()

favoritesRouter.use(ensureAuthenticated)

favoritesRouter.post('/:dish_id', favoritesController.create)

module.exports = favoritesRouter
