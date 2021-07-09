import Ajv from 'ajv'
import logger from '../utils/logger'
import addFormats from 'ajv-formats'
import addKeywords from 'ajv-keywords'

const ajv = new Ajv({
  logger: {
    log: logger.info,
    warn: logger.warn,
    error: logger.error,
  },
  useDefaults: true,
  coerceTypes: true,
  allErrors: true,
})

addFormats(ajv)
addKeywords(ajv)

export default ajv
