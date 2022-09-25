import { RouteBase } from './bases/route.base'
import { ApiRoute } from './main/api/api.routing'
import { AuthRoute } from './main/auth/auth.routing'

export class AppRoute extends RouteBase {
  private static apiRoute = new ApiRoute()
  private static authRoute = new AuthRoute()

  constructor () {
    super()
  }

  protected registerRoute (): void {
    this.router.use('/api', AppRoute.apiRoute.router)
    this.router.use('/auth', AppRoute.authRoute.router)
  }
}
