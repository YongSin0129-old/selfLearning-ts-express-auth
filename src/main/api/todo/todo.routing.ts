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
    this.router
      .route('/')
      .get(this.responseHandler(this.controller.getTodos))
      .post(this.responseHandler(this.controller.addTodo))

    this.router
      .route('/:id')
      .get(this.responseHandler(this.controller.getTodo))
      .delete(this.responseHandler(this.controller.removeTodo))

    this.router.patch(
      '/:id/completed',
      this.responseHandler(this.controller.completedTodo)
    )
  }
}
