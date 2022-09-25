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

  public async completedTodo (req: Request): Promise<ResponseObject> {
    const { id } = req.params
    const { completed } = req.body
    const options = {
      new: true,
      runValidators: true
    }
    const todo = await TodoModel.findByIdAndUpdate(id, { completed }, options)
    if (!todo) {
      return this.formatResponse('Not found.', HttpStatus.NOT_FOUND)
    }
    const dto = new TodoDTO(todo)
    return this.formatResponse(dto, HttpStatus.OK)
  }

  public async removeTodo (req: Request): Promise<ResponseObject> {
    const { id } = req.params
    const todo = await TodoModel.findByIdAndRemove(id)
    if (!todo) {
      return this.formatResponse('Not found.', HttpStatus.NOT_FOUND)
    }
    return this.formatResponse(null, HttpStatus.NO_CONTENT)
  }

  public async getTodo (req: Request): Promise<ResponseObject> {
    const { id } = req.params
    const todo = await TodoModel.findById(id)
    if (!todo) {
      return this.formatResponse('Not found.', HttpStatus.NOT_FOUND)
    }
    const dto = new TodoDTO(todo)
    return this.formatResponse(dto, HttpStatus.OK)
  }
}
