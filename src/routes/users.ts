import { FastifyInstance } from 'fastify'
import { signUpCtrl, searchUserCtrl, loginCtrl } from '../controllers/users'
import {
  searchUserSchema,
  userLoginSchema,
  userSignUpSchema,
} from '../validations/users'

async function userRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post('/signup', { schema: userSignUpSchema }, signUpCtrl)
  fastify.post('/search', { schema: searchUserSchema }, searchUserCtrl)
  fastify.post(
    '/login',
    {
      schema: userLoginSchema,
    },
    loginCtrl,
  )
  fastify.get("/profile",{
      preValidation:[fastify.verifyJwt]
  },(req,res)=>{
      res.code(200)
      return "hello"
  }
}
export default userRoutes
export const autoPrefix = '/users'
