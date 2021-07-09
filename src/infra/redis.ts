import Redis, { RedisOptions } from 'ioredis'
import config from '../config'
import logger from '../utils/logger'

const redisConf: RedisOptions = {
  host: config.redis_host,
  port: Number(config.redis_port),
  db: Number(config.redis_db),
}
const redis = new Redis(redisConf)

async function ping(): Promise<string> {
  const pong = await redis.ping()

  logger.info('Redis => ' + pong)
  return pong
}

export { ping }
export default redis
