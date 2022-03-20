import { FastifyReply } from 'fastify'

import JwtUtil from '../utils/jwt'
import constant from '../utils/constant'
import { IRequestData } from '../interfaces/api'
import { IUserJwt } from '../interfaces/users.dto'

async function verifyAuthenticateSignature(
  req: IRequestData,
  res: FastifyReply,
): Promise<void> {
  const token = req.headers['x-auth-token']?.toString().replace('Bearer ', '')
  const valid = JwtUtil.verify(token)
  if (!valid) {
    res.code(401)
    res.send({
      status: false,
    })
  } else {
    req.user = valid as IUserJwt
  }
}
async function validAccessToken(
  req: IRequestData,
  res: FastifyReply,
): Promise<void> {
  const { type } = req.user
  if (type !== constant.jwt_access_token_type) {
    res.code(401)
    res.send({ status: false })
  }
}

export { verifyAuthenticateSignature, validAccessToken }
