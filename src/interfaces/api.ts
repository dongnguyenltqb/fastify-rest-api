import { FastifyRequest } from 'fastify'
import { IUserJwt } from './users.dto'

interface IAPIResponse<T> {
  status?: boolean
  message?: string
  data?: T | unknown
}

interface IRequestData extends FastifyRequest {
  user: IUserJwt
}

export { IRequestData, IAPIResponse }
