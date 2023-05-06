const DiskStorage = require('../providers/DiskStorage')
const AppError = require('../utils/AppError')

class UserAvatarUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ user_id, avatarFilename }) {
    const user = await this.userRepository.findById(user_id)

    const diskStorage = new DiskStorage()

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    user.avatar = filename

    await this.userRepository.changeAvatar(user_id, filename)

    return user
  }
}

module.exports = UserAvatarUpdateService
