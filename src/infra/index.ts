import mongoose from 'mongoose'
import { IUser } from '../interfaces/entity'

const UserSchema = new mongoose.Schema<IUser>({
  email: String,
  password: String,
  firstName: String,
})
export const db = {
  user: mongoose.model<IUser>('users', UserSchema),
}
