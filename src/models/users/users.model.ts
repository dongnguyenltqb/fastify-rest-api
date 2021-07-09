import * as Mongoose from 'mongoose'

import UserSchema from './users.schema'
import { IUserDocument, IUserModel } from './users.types'

export default Mongoose.model<IUserDocument, IUserModel>('users', UserSchema)
