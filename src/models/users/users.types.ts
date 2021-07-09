import { Document, Model } from 'mongoose'

import { IUser } from '../../interfaces/users'

interface IUserDocument extends IUser, Document {
  setFirstName: (firstName: string) => Promise<IUserDocument>
  hashPassword: () => Promise<string>
  comparePassword: (text: string) => Promise<boolean>
}

interface IUserModel extends Model<IUserDocument> {
  findOneOrCreate: (
    this: IUserModel,
    {
      firstName,
      lastName,
      age,
    }: { firstName: string; lastName: string; age: number },
  ) => Promise<IUserDocument>
  findByAge: (
    this: IUserModel,
    min?: number,
    max?: number,
  ) => Promise<IUserDocument[]>
  findByEmail: (this: IUserModel, email: string) => Promise<IUserDocument>
}

export { IUserDocument, IUserModel }
