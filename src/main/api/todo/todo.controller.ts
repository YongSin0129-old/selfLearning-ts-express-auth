import { ResponseObject } from '../../../common/response/response.object'

import { ControllerBase } from '../../../bases/controller.base'
import { HttpStatus } from '../../../types/response.type'

export class TodoController extends ControllerBase {
  public async getTodos (): Promise<ResponseObject> {
    return this.formatResponse([], HttpStatus.OK)
  }
}
