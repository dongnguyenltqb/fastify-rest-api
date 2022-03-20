import { Client } from '@elastic/elasticsearch'

export abstract class AbstractRepository<T> {
  constructor(protected db: T, protected elasticSearchClient: Client) {
    this.db = db
    this.elasticSearchClient = elasticSearchClient
  }
}
