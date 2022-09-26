import { RouteBase } from '../../bases/route.base'
import { TodoRoute } from './todo/todo.routing'
import { expressjwt } from 'express-jwt'

export class ApiRoute extends RouteBase {
  private static todoRoute = new TodoRoute()

  constructor () {
    super()
  }

  protected registerRoute (): void {
    const secret = process.env.JWT_SIGN || 'default secret'
    this.router.use(
      expressjwt({
        secret: secret,
        // userProperty: 'payload',
        algorithms: ['HS256']
      })
    )

    this.router.use('/todos', ApiRoute.todoRoute.router)
  }
}
