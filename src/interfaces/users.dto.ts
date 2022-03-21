import { FromSchema } from 'json-schema-to-ts'
import { JwtPayload } from 'jsonwebtoken'
import { Document } from 'mongoose'
import {
  searchUserSchema,
  userLoginSchema,
  userSignUpSchema,
} from '../validations/users'
import { IUser } from './entity'

export interface IUserPublic {
  _id: string
  email: string
  firstName?: string
}

export interface IUserJwt extends JwtPayload {
  type: string
  email: string
}
export interface IUserToken {
  accessToken?: string
  refreshToken?: string
}

export interface ICreateUser extends FromSchema<typeof userSignUpSchema.body> {}
export interface ISearchUser extends FromSchema<typeof searchUserSchema.body> {}
export interface IUserLogin extends FromSchema<typeof userLoginSchema.body> {}

export interface ISearchUserResult {
  total: number
  data: IESUserSearchDocument[]
}

export interface IESUserSearchDocument extends IESUserDocument {
  _score: number
}
export interface IESUserDocument extends IUser {
  _id: string
}
export interface IESUserPreIndexDocument extends IUser {}

export interface IESUserIndexResult {
  _id: string
}

export interface IUserDocument extends Document, IUser {}
