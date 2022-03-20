import { UserModel } from '../models'
import { AbstractRepository } from './abstract'
import { db } from '../infra'
import {
  IESUserDocument,
  IESUserSearchDocument,
  ISearchUser,
  ISearchUserResult,
} from '../interfaces/users.dto'

export class UserRepository extends AbstractRepository<typeof db> {
  public async findByEmail(email: string): Promise<UserModel> {
    const document = await this.db.user.findOne({ email }).exec()
    return document ? new UserModel(document.toJSON()) : null
  }
  public async searchUserElasticsearch(
    input: ISearchUser,
  ): Promise<ISearchUserResult> {
    const { page, size, keyword } = input
    const resp = await this.elasticSearchClient.search<IESUserDocument>({
      index: 'users',
      rest_total_hits_as_int: true,
      body: {
        query: {
          bool: {
            should: keyword
              ? [
                  {
                    match: {
                      firstName: keyword,
                    },
                  },
                  {
                    match: {
                      lastName: keyword,
                    },
                  },
                  {
                    match: {
                      email: keyword,
                    },
                  },
                ]
              : [],
          },
        },
      },
      from: (page - 1) * size,
      size: size,
    })

    const data = resp.hits.hits
    const users: IESUserSearchDocument[] = []
    for (const user of data) {
      users.push({
        _score: user._score,
        _id: user._id,
        ...user._source,
      })
    }
    const result: ISearchUserResult = {
      total: Number(resp.hits.total),
      data: users,
    }
    return result
  }
}
