import * as Mongoose from 'mongoose'

import { findByEmail } from './users.statics'
import { comparePassword, hashPassword, setFirstName } from './users.methods'

const UserSchema = new Mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
})

// Static method for model
UserSchema.statics.findByEmail = findByEmail

// Method of instance
UserSchema.methods.setFirstName = setFirstName
UserSchema.methods.setFirstName = setFirstName
UserSchema.methods.hashPassword = hashPassword
UserSchema.methods.comparePassword = comparePassword

export default UserSchema
