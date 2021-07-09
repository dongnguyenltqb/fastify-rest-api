// Complete definition of the Search response
interface IESShardsResponse {
  total: number
  successful: number
  failed: number
  skipped: number
}

interface IESExplanation {
  value: number
  description: string
  details: IESExplanation[]
}
interface IESSearchResponse<T> {
  took: number
  timed_out: boolean
  _scroll_id?: string
  _shards: IESShardsResponse
  hits: {
    total: {
      value: number
    }
    max_score: number
    hits: Array<{
      _index: string
      _type: string
      _id: string
      _score: number
      _source: T
      _version?: number
      _explanation?: IESExplanation
      fields?: any
      highlight?: any
      inner_hits?: any
      matched_queries?: string[]
      sort?: string[]
    }>
  }
  aggregations?: any
}

export { IESSearchResponse }
