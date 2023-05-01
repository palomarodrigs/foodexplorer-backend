const UserRepository = require('../repositories/UserRepository')
const AppError = require('../utils/AppError')

async function ensureUserIsAdmin(request, response, next) {
  const userId = request.user.id

  const userRepository = new UserRepository()

  const user = await userRepository.findById(userId)

  if (!user.isAdmin) {
    throw new AppError('Unauthorized user', 401)
  }

  next()
}

module.exports = ensureUserIsAdmin
