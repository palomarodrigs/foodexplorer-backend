const { sign } = require('jsonwebtoken')
const { compare } = require('bcryptjs')
const authConfig = require('../configs/auth')
const AppError = require('../utils/AppError')

class SessionsService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Wrong email or password', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Wrong email or password', 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return { user, token }
  }
}

module.exports = SessionsService
