const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')

class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, old_password, password, user_id }) {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found!')
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email)

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('This email is already in use.')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && !old_password) {
      throw new AppError('You need to enter the old password to set the new password!')
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('The old password does not match.')
      }

      if (password === old_password) {
        throw new AppError('The new password must be different from the current one.')
      }

      user.password = await hash(password, 8)
    }

    const userUpdated = this.userRepository.update({
      name: user.name,
      email: user.email,
      password: user.password,
      id: user.id
    })

    return userUpdated
  }
}

module.exports = UserUpdateService
