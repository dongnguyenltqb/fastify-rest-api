import jwt from 'jsonwebtoken'

import config from '../config'
import { IUserJwt } from '../interfaces/users.dto'
import logger from './logger'

export default class JwtUtil {
  static signWithExpires(payload: IUserJwt, expires: number): string {
    return jwt.sign(payload, config.jwt_secret, {
      expiresIn: expires,
    })
  }

  static verify(token: string): IUserJwt | boolean {
    try {
      const decoded = jwt.verify(token, config.jwt_secret)
      return decoded as IUserJwt
    } catch (err) {
      logger.error(err)
      return false
    }
  }
}
