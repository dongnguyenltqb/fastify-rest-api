import { UserService } from './users'

export class ServiceContext {
  private static instance: ServiceContext
  private userService: UserService
  static getInstance(): ServiceContext {
    if (!ServiceContext.instance) {
      ServiceContext.instance = new ServiceContext()
    }
    return ServiceContext.instance
  }
  public setUserService(userService: UserService) {
    this.userService = userService
  }
  public getUserService(): UserService {
    return this.userService
  }
}
