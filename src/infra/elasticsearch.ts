import { Client } from '@elastic/elasticsearch'
import config from '../config'

const client = new Client({ node: config.elasticsearch_uri })

function getElasticSearchClient() {
  return client
}

export { getElasticSearchClient }
