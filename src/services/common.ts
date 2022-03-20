import { FastifyReply } from 'fastify'
import logger from '../utils/logger'

export function handleSuccessResponse<T>(
  res: FastifyReply,
  status: boolean,
  data: T,
): void {
  res.code(200)
  res.send({
    status,
    result: data,
  })
}
export function handleErrorResponse(res: FastifyReply, error: Error): void {
  logger.error(error)
  res.code(400)
  res.send({
    status: false,
    message: error.message,
  })
}
