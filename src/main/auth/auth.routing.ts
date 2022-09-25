import { RouteBase } from '../../bases/route.base'
import { LocalAuthRoute } from './local/local-auth.routing'

export class AuthRoute extends RouteBase {
  private static LocalAuthRoute = new LocalAuthRoute()

  constructor () {
    super()
  }

  protected registerRoute (): void {
    this.router.use('/local', AuthRoute.LocalAuthRoute.router)
  }
}
