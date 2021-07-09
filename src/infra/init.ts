import logger from '../utils/logger'
import { ping as esPing } from './elasticsearch'
import { ping as redisPing } from './redis'
import { connect } from './mongoose'

async function init(): Promise<void> {
  try {
    await Promise.all([connect(), esPing(), redisPing()])
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

export { init }
