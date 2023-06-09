const UserRepository = require('../repositories/UserRepository')
const UserAvatarUpdateService = require('../services/UserAvatarUpdateService')

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id
    const avatarFilename = request.file.filename

    const userRepository = new UserRepository()
    const userAvatarUpdateService = new UserAvatarUpdateService(userRepository)

    const user = await userAvatarUpdateService.execute({ user_id, avatarFilename })

    return response.json(user)
  }
}

module.exports = UserAvatarController
