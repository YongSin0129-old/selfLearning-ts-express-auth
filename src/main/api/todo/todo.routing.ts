import { RouteBase } from '../../../bases/route.base'
import { TodoController } from './todo.controller'

export class TodoRoute extends RouteBase {
  protected controller!: TodoController

  constructor () {
    super()
  }

  protected initial (): void {
    this.controller = new TodoController()
    super.initial()
  }

  protected registerRoute (): void {
    this.router.route('/').get(this.responseHandler(this.controller.getTodos))

    this.router.route('/').post(this.responseHandler(this.controller.addTodo))
  }
}
