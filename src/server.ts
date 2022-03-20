import 'source-map-support/register'
import 'dotenv/config'
import fastify from 'fastify'
import autoload from 'fastify-autoload'
import path from 'path'

import Infra from './infra/init'
import ajv from './validations'
import logger from './utils/logger'
import config from './config'
import { IUserJwt } from './interfaces/users.dto'
import { ServiceContext } from './services'
import { UserService } from './services/users'
import { db } from './infra'
import { getElasticSearchClient } from './infra/elasticsearch'
import { UserRepository } from './repository'

declare module 'fastify' {
  interface FastifyRequest {
    user: IUserJwt
  }
}

const server = fastify({
  logger: false,
})

server.setValidatorCompiler(({ schema }) => {
  return ajv.compile(schema)
})

server.register(autoload, {
  dir: path.join(__dirname, 'routes'),
  options: {
    prefix: '/api',
  },
})

async function start(): Promise<void> {
  await Infra.setup()
  ServiceContext.getInstance().setUserService(
    new UserService(new UserRepository(db, getElasticSearchClient())),
  )
  const data = await server.listen(config.server_port as string, '0.0.0.0')
  logger.info(`Server listening at ${data}`)
}

export default start
