import bcrypt from 'bcrypt'
import config from '../../config'
import { IUserDocument } from './users.types'

async function setFirstName(firstName: string): Promise<IUserDocument> {
  this.firstName = firstName
  await this.save()
  return this
}

function hashPassword(): Promise<string> {
  console.log(this)
  return bcrypt.hash(this.password, config.salt_round)
}

function comparePassword(text: string): Promise<boolean> {
  return bcrypt.compare(text, this.password)
}

export { setFirstName, hashPassword, comparePassword }
