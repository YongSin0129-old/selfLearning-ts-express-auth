import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler
} from 'express'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { AppRoute } from './app.routing'
import { Database } from './database'
import passport from 'passport'

export class App {
  private app = express()
  private AppRoute!: AppRoute

  constructor () {
    this.setEnvironment()
    this.setHelmet()
    this.setCors()
    this.setPassport()
    this.registerRoute()
  }

  // ====================================================================
  // @Public Methods
  // ====================================================================

  public bootstrap (): void {
    this.app.listen(process.env.PORT, () =>
      console.log(`API Server is running at port ${process.env.PORT}.`)
    )
  }

  // ====================================================================
  // @Private Methods
  // ====================================================================

  private setHelmet (): void {
    this.app.use(helmet())
  }

  private setCors (): void {
    this.app.use(
      cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204
      })
    )
  }

  private setEnvironment (): void {
    dotenv.config({
      path: path.resolve(
        __dirname,
        `./environments/${process.env.NODE_ENV}.env`
      )
    })
  }

  private registerRoute (): void {
    this.app.use(express.json())
    this.app.use(
      express.urlencoded({
        extended: true
      })
    )
    // debug
    this.app.get('/', (req, res, next) => {
      const debugObj = {
        headers: req.headers,
        method: req.method,
        body: req.body
      }
      // res.json(debugObj)
      next()
    })
    // route 導向
    this.AppRoute = new AppRoute()
    this.app.use('/', this.AppRoute.router)
    this.app.get('/', (req, res, next) => res.send('Hello! express !!!'))
  }

  public setException (handler: ErrorRequestHandler): void {
    this.app.use(handler)
  }

  public launchDatabase (): void {
    const database = new Database()
    database.connect()
  }

  private setPassport (): void {
    passport.initialize()
  }
}

const app = express()
