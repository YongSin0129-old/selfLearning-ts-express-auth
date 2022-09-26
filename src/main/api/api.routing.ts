import { RouteBase } from '../../bases/route.base'
import { TodoRoute } from './todo/todo.routing'
import { expressjwt } from 'express-jwt'

export class ApiRoute extends RouteBase {
  private static todoRoute = new TodoRoute()

  constructor () {
    super()
  }

  protected registerRoute (): void {
    this.router.use(
      expressjwt({
        secret: process.env.JWT_SIGN as string,
        requestProperty: 'payload',
        algorithms: ['HS256']
      })
    )

    this.router.use('/todos', ApiRoute.todoRoute.router)
  }
}
