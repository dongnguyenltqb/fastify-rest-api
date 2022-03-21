import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../config'
import { IUser } from '../interfaces/entity'
import { AbstractModel } from './abstract'
import { IESUserDocument, IUserPublic } from '../interfaces/users.dto'

// Represent data which come from MongoDB
// Call constructor to create a new instance
export class UserModel implements AbstractModel<IUser> {
  _id: mongoose.Types.ObjectId
  email: string
  password: string
  firstName: string
  constructor(user: IUser) {
    if (user._id) this._id = new mongoose.Types.ObjectId(user._id)
    this.email = user.email
    this.password = user.password
    this.firstName = user.firstName
  }
  public static fromServiceObject(user: User): UserModel {
    return new UserModel({
      _id: user._id ? Object(user._id) : null,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
    })
  }
  public toServiceObject(): User {
    return new User({
      _id: this._id.toHexString(),
      email: this.email,
      password: this.password,
      firstName: this.firstName,
    })
  }
}

export class User implements IUser {
  _id: string
  email: string
  password: string
  firstName: string

  constructor(user: IUser) {
    this._id = user._id
    this.email = user.email
    this.password = user.password
    this.firstName = user.firstName
  }
  public static fromModel(user: UserModel): User {
    const attr = {
      // must have id in UserModel
      _id: user._id.toHexString(),
      email: user.email,
      password: user.password,
      firstName: user.firstName,
    }
    return new User(attr)
  }
  public toUserModel(): UserModel {
    return UserModel.fromServiceObject(this)
  }
  public fromESModel(user: IESUserDocument): User {
    const attr = {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
    }
    return new User(attr)
  }
  public getPublicObject(): IUserPublic {
    return {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
    }
  }
  public async hashPassword(): Promise<string> {
    return bcrypt.hash(this.password, config.salt_round)
  }
  public async comparePassword(text: string): Promise<boolean> {
    return bcrypt.compare(text, this.password)
  }
}
