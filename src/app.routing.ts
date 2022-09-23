import { RouteBase } from './bases/route.base'
import { ApiRoute } from './main/api/api.routing'

export class AppRoute extends RouteBase {
  private static apiRoute = new ApiRoute()

  constructor () {
    super()
  }

  protected registerRoute (): void {
    this.router.use('/api', AppRoute.apiRoute.router)
  }
}
