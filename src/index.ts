import { App } from './app'
import { DefaultException } from './exceptions/default.exception'
import { JWTException } from './exceptions/jwt.exception'
import { ResponseErrorException } from './exceptions/response-error.exception'

const bootstrap = () => {
  const app = new App()
  app.setException(ResponseErrorException)
  app.setException(JWTException)
  app.setException(DefaultException)
  app.launchDatabase()
  app.bootstrap()
}

bootstrap()
