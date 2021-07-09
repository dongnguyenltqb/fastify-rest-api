import mongoose from 'mongoose'

import models from '../models'
import {
  ICreateUser,
  IESUser,
  ISearchUser,
  ISearchUserResult,
} from '../interfaces/users'
import es7 from '../infra/elasticsearch'
import { IESSearchResponse } from '../interfaces/elasticsearch'
import { IUserDocument } from '../models/users/users.types'

async function createUser(inp: ICreateUser): Promise<IUserDocument> {
  const u = new models.users({
    _id: new mongoose.Types.ObjectId(),
    email: inp.email,
    password: inp.password,
    firstName: inp.firstName,
  })
  u.password = await u.hashPassword()
  await u.save()
  return u
}

async function searchUser(input: ISearchUser): Promise<ISearchUserResult> {
  const { page, size, keyword } = input
  const resp = await es7.search<IESSearchResponse<IESUser>>({
    index: 'users',
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
  const data = resp.body.hits.hits
  const users: IESUser[] = []
  for (const user of data) {
    users.push({ ...user._source, _score: user._score })
  }
  const result: ISearchUserResult = {
    total: resp.body.hits.total.value,
    data: users,
  }
  return result
}

export { createUser, searchUser }
