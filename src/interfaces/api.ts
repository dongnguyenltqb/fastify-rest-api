import { FastifyRequest } from 'fastify'

interface IApiResponse {
  status?: boolean
  message?: string
  data?: any
}

interface IRequestData extends FastifyRequest<IRequestData> {
  QueryStrings: any
  Params: any
  Body: any
  Headers: any
}

export { IRequestData, IApiResponse }
