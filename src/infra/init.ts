import logger from '../utils/logger'
import { ping as redisPing } from './redis'
import { connect } from './mongoose'
import { getElasticSearchClient } from './elasticsearch'

export default class Infra {
  static async setup(): Promise<void> {
    try {
      await Promise.all([
        connect(),
        getElasticSearchClient().ping(),
        redisPing(),
      ])
    } catch (err) {
      logger.error(err)
      process.exit(1)
    }
  }
}
