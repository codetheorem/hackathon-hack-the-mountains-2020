import http from 'http'

import Router from './router'
import Response from './response'
import { request } from './request.interfaces'
import { layer, methods } from './router.interfaces'

require('dotenv').config()

/**
 * @class
 * @classdesc The main class used to initialize the framework application.
 * @author YashKumarVerma<yk.verma2000@gmail.com>
 */
class Shatabdi {
  private request: any | undefined

  private response: Response | undefined

  private router: Router

  private port: number | string

  private server: http.Server

  /**
   * @constructor
   * @returns void
   */
  constructor() {
    this.server = http.createServer()
    this.port = `${process.env.PORT}`
    this.router = new Router()
  }

  //   provide router function from same instance
  public get(pattern: string, ...args: layer[]): void {
    this.router.register(methods.GET, pattern, ...args)
  }

  /**
   * The core engine of the framework which passes the incoming request to the route processor
   * This function is passed to server instance, ideally in server.ts
   * @param req the http request passed from http.createServer to process each incoming request
   * @param res the http response object which is passed to the router to be supplied to the layers
   */
  public engine(req: request, res: http.ServerResponse) {
    this.request = req
    this.response = new Response(req, res)

    this.router.process(this.request, this.response)

    // if (req.url !== '/favicon.ico') console.log(`request hit as ${req.method} on ${req.url}`)
  }
}

export default Shatabdi
