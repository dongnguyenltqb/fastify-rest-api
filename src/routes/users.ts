import { FastifyInstance } from 'fastify'

import { validAccessToken, verifyAuthenticateSignature } from '../hooks'
import { handleErrorResponse, handleSuccessResponse } from '../services/common'
import { ServiceContext } from '../services'

import {
  searchUserSchema,
  userLoginSchema,
  userSignUpSchema,
} from '../validations/users'
import { ICreateUser, ISearchUser, IUserLogin } from '../interfaces/users.dto'
import { IRequestData } from '../interfaces/api'

async function userRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post<{
    Body: ICreateUser
  }>('/signup', { schema: userSignUpSchema }, async (req, res) => {
    const userService = ServiceContext.getInstance().getUserService()
    try {
      const { body } = req
      const { email } = body
      const doc = await userService.getUserByEmail(email)
      if (doc) throw new Error('User was existed')
      const user = await userService.createUser(body)
      handleSuccessResponse(res, true, user)
    } catch (err) {
      handleErrorResponse(res, err)
    }
  })

  fastify.post<{
    Body: IUserLogin
  }>(
    '/login',
    {
      schema: userLoginSchema,
    },
    async (req, res) => {
      const userService = ServiceContext.getInstance().getUserService()
      try {
        const { email, password } = req.body
        const result = await userService.login(email, password)
        handleSuccessResponse(res, true, result)
      } catch (err) {
        handleErrorResponse(res, err)
      }
    },
  )

  fastify.get(
    '/me',
    {
      preValidation: [verifyAuthenticateSignature, validAccessToken],
    },
    async (req: IRequestData, res) => {
      const userService = ServiceContext.getInstance().getUserService()
      const { user } = req
      userService
        .getUserByEmail(user.email)
        .then((doc) => handleSuccessResponse(res, true, doc))
        .catch((err) => handleErrorResponse(res, err))
    },
  )
  fastify.post<{
    Body: ISearchUser
  }>(
    '/search',
    {
      schema: searchUserSchema,
    },
    async function (req, res) {
      const userService = ServiceContext.getInstance().getUserService()
      const data = await userService.searchUser(req.body)
      handleSuccessResponse(res, true, data)
    },
  )
}

export default userRoutes
export const autoPrefix = '/users'
