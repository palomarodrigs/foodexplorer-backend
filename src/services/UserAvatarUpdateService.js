const DiskStorage = require('../providers/DiskStorage')
const AppError = require('../utils/AppError')

class UserAvatarUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ user_id, avatarFilename }) {
    const diskStorage = new DiskStorage()

    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only users authenticated can change avatar', 401)
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    user.avatar = filename

    const avatarUpdated = await this.userRepository.changeAvatar(avatarFilename, user.id)

    return avatarUpdated
  }
}

module.exports = UserAvatarUpdateService
