import mongoose from 'mongoose'
import config from '../config'
import logger from '../utils/logger'

async function connect(): Promise<void> {
  await mongoose.connect(config.mongodb_uri as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  logger.info('Connected to mongodb server ')
}

export { connect }
