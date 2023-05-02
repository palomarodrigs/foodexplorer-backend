const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const ensureUserIsAdmin = require('../middlewares/ensureUserIsAdmin')
const CartsController = require('../controllers/CartsController')

const cartsRoutes = Router()

const cartsController = new CartsController()

cartsRoutes.use(ensureAuthenticated)

cartsRoutes.post('/', cartsController.create)

module.exports = cartsRoutes
