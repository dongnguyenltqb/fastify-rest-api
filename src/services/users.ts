import { User, UserModel } from '../models'
import constant from '../utils/constant'
import JwtUtil from '../utils/jwt'

import {
  ICreateUser,
  ISearchUser,
  ISearchUserResult,
  IUserToken,
} from '../interfaces/users.dto'
import { UserRepository } from '../repository'

export class UserService {
  private userRepository: UserRepository
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }
  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email)
    return user ? user.toServiceObject() : null
  }
  signToken(email: string): IUserToken {
    return {
      accessToken: JwtUtil.signWithExpires(
        {
          type: constant.jwt_access_token_type,
          email,
        },
        60 * 60,
      ),
      refreshToken: JwtUtil.signWithExpires(
        {
          type: constant.jwt_refresh_token_type,
          email,
        },
        30 * 24 * 60 * 60,
      ),
    }
  }
  public async login(email: string, password: string): Promise<IUserToken> {
    const doc = await this.getUserByEmail(email)
    if (!doc) throw new Error('user not found')
    const equal = doc.comparePassword(password)
    if (!equal) throw new Error('Invalid password.')
    return this.signToken(email)
  }
  public async createUser(input: ICreateUser): Promise<User> {
    const u = new User({
      email: input.email,
      password: input.password,
    })
    u.password = await u.hashPassword()
    const response = await this.userRepository.createUser(u.toUserModel())
    return response.toServiceObject()
  }
  public async searchUser(input: ISearchUser): Promise<ISearchUserResult> {
    return await this.userRepository.searchUserElasticsearch(input)
  }
}
