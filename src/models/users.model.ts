import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../config'
import { IUser } from '../interfaces/entity'
import { AbstractModel } from './abstract'
import { IESUserDocument } from '../interfaces/users.dto'

// Represent data which come from MongoDB
export class UserModel implements AbstractModel<IUser> {
  _id: mongoose.Types.ObjectId
  email: string
  password: string
  firstName: string
  constructor(user: IUser) {
    this.email = user.email
    this.password = user.password
    this.firstName = user.firstName
  }
  public toServiceObject(): User {
    return new User({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
    })
  }
}

export class User implements IUser {
  email: string
  password: string
  firstName: string

  constructor(user: IUser) {
    this.email = user.email
    this.password = user.password
    this.firstName = user.firstName
  }

  public fromModel(user: UserModel): User {
    const attr = {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
    }
    return new User(attr)
  }
  public fromESModel(user: IESUserDocument): User {
    const attr = {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
    }
    return new User(attr)
  }
  public async hashPassword(): Promise<string> {
    return bcrypt.hash(this.password, config.salt_round)
  }
  public async comparePassword(text: string): Promise<boolean> {
    return bcrypt.compare(text, this.password)
  }
}
