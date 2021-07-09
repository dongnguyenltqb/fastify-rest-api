import jwt from 'jsonwebtoken'

import config from '../config'
import { IUserJwt } from '../interfaces/users'
import logger from './logger'

function signWithExpires(payload: IUserJwt, expires: number): string {
  return jwt.sign(payload, config.jwt_secret, {
    expiresIn: expires,
  })
}

function verify(token: string): IUserJwt | boolean {
  try {
    const decoded = jwt.verify(token, config.jwt_secret)
    return decoded as IUserJwt
  } catch (err) {
    logger.error(err)
    return false
  }
}

export { signWithExpires, verify }
