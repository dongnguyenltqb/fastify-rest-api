import { Client } from '@elastic/elasticsearch'
import config from '../config'
import logger from '../utils/logger'

const es7 = new Client({ node: config.elasticsearch_uri })

async function ping(): Promise<void> {
  await es7.ping()
  logger.info('Elasticseach is connected')
}

export { ping }
export default es7
