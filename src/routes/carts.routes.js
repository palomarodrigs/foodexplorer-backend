const { Router } = require('express')

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const CartsController = require('../controllers/CartsController')

const cartsRoutes = Router()

const cartsController = new CartsController()

cartsRoutes.use(ensureAuthenticated)

cartsRoutes.post('/', cartsController.create)
cartsRoutes.get('/', cartsController.index)

module.exports = cartsRoutes
