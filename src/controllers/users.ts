import { FastifyReply } from 'fastify'

import logger from '../utils/logger'

import { IApiResponse } from '../interfaces/api'
import {
  ICreateUserRequestData,
  ISearchUserRequestData,
  ISearchUserResult,
  IUserLogin,
} from '../interfaces/users'

import { createUser, searchUser } from '../services/users'
import { IUserDocument } from '../models/users/users.types'

import models from '../models/index'
import { signWithExpires } from '../utils/jwt'
import constant from '../utils/constant'

async function loginCtrl(
  req: IUserLogin,
  res: FastifyReply,
): Promise<IApiResponse> {
  const { body } = req
  try {
    const doc = await models.users.findByEmail(body.email)
    const equal = await doc.comparePassword(body.password)
    if (!equal) throw new Error('Wrong password')

    const accessToken = signWithExpires(
      {
        type: constant.jwt_access_token_type,
        email: body.email,
      },
      60 * 60,
    )

    const refreshToken = signWithExpires(
      {
        type: constant.jwt_refresh_token_type,
        email: body.email,
      },
      30 * 24 * 60 * 60,
    )

    return {
      status: true,
      data: {
        accessToken,
        refreshToken,
      },
    }
  } catch (err) {
    logger.error(err)
    res.code(400)
    return {
      status: false,
      message: err.message,
    }
  }
}

async function signUpCtrl(
  req: ICreateUserRequestData,
  res: FastifyReply,
): Promise<IApiResponse> {
  try {
    const { body } = req
    const exists = await models.users.findByEmail(body.email)
    if (exists) throw new Error('User was existed')

    const user: IUserDocument = await createUser(body)

    return {
      status: true,
      data: user,
    }
  } catch (err) {
    logger.error(err)
    res.code(500)
    return {
      status: false,
      message: err.message,
    }
  }
}

async function searchUserCtrl(
  req: ISearchUserRequestData,
  res: FastifyReply,
): Promise<IApiResponse> {
  try {
    const { page, size, keyword } = req.body
    const data: ISearchUserResult = await searchUser({
      page,
      size,
      keyword,
    })
    return {
      status: true,
      data,
    }
  } catch (err) {
    res.code(400)
    logger.error(err)
    return {
      status: false,
      message: err.message,
    }
  }
}

export { signUpCtrl, searchUserCtrl, loginCtrl }
