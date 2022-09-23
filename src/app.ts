import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { AppRoute } from './app.routing'

export class App {
  private app = express()
  private route = new AppRoute()

  constructor () {
    this.setEnvironment()
    this.setHelmet()
    this.setCors()
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
        `../src/environments/${process.env.NODE_ENV}.env`
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
    this.app.use('/', this.route.router)

    this.app.get('/', (req, res, next) => res.send('Hello! express !!!'))
  }
}

const app = express()
