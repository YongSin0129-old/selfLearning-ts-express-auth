import { ResponseObject } from '../../../common/response/response.object'
import { Request } from 'express'
import { TodoModel } from '../../../models/todo.model'
import { TodoDTO } from '../../../dtos/todo.dto'
import { ControllerBase } from '../../../bases/controller.base'
import { HttpStatus } from '../../../types/response.type'
import { DefaultQuery } from '../../../types/request.type'

export class TodoController extends ControllerBase {
  public async addTodo (req: Request): Promise<ResponseObject> {
    const { content } = req.body
    const todo = new TodoModel({ content, completed: false })
    const document = await todo.save()
    const dto = new TodoDTO(document)
    return this.formatResponse(dto, HttpStatus.CREATED)
  }

  public async getTodos (req: Request): Promise<ResponseObject> {
    const { limit, skip } = req.query
    const truthLimit =
      Math.min(Number(limit), DefaultQuery.MAX_LIMIT) || DefaultQuery.LIMIT
    const truthSkip = Number(skip) || DefaultQuery.SKIP
    const todos = await TodoModel.find()
      .skip(truthSkip)
      .limit(truthLimit)
    const dtos = todos.map(todo => new TodoDTO(todo))
    return this.formatResponse(dtos, HttpStatus.OK)
  }
}
