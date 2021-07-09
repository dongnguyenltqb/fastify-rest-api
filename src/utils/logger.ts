import Pino from 'pino'

const logger = Pino({
  level: 'info',
  base: null,
})

export default logger
