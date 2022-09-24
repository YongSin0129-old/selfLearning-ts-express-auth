import { RouteBase } from '../../bases/route.base'
import { TodoRoute } from './todo/todo.routing'

export class ApiRoute extends RouteBase {
  private static todoRoute = new TodoRoute()

  constructor () {
    super()
  }

  protected registerRoute (): void {
    this.router.use('/todos', ApiRoute.todoRoute.router)
  }
}
