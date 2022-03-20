import mongoose from 'mongoose'
import config from '../config'
import logger from '../utils/logger'

async function connect(): Promise<void> {
  logger.info('Connecting to mongodb server ')
  await mongoose.connect(config.mongodb_uri as string)
  logger.info('Connected to mongodb server ')
}

export { connect }
