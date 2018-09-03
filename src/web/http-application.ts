import http from 'http'
import * as utils from '../utils'
import { IHttpModule } from './http-module'
import { HttpContext } from './http-context'
import { EventHandler } from './event-handler'
import { PayloadEventArgs } from './payload-event-args'

export class HttpApplication {
  private port: number
  private server: http.Server
  private modules: Array<IHttpModule>

  public constructor() {
    this.modules = Array<IHttpModule>()
  }

  public Init(): void {
    for (let module of this.modules) {
      module.Init(this)
    }
    let port = utils.stringToInt(process.env.PORT)
    if (port < 10) {
      port = 3000
    } else if (port > 65535) {
      port = 3000
    }
    this.port = port

    this.server = http.createServer(
      (request: http.IncomingMessage, response: http.ServerResponse) => {
        let httpContext = new HttpContext({ request, response })
        let eventArgs = new PayloadEventArgs<HttpContext>()
        eventArgs.Payload = httpContext
        this.PostResolveRequestCache.Trigger(this, eventArgs)
        this.PreRequestHandlerExecute.Trigger(this, eventArgs)
        httpContext.Handler.ProcessRequest(httpContext)
        this.PostRequestHandlerExecute.Trigger(this, eventArgs)
      }
    )
    this.server.on('error', err => this.OnError(err))
    this.server.on('listening', () => this.OnListening())
  }

  public RegisterModule(module: IHttpModule): void {
    this.modules.push(module)
  }

  public Start(): void {
    this.Application_Start()
    this.server.listen(this.port)
  }

  public Application_Start(): void {}

  public OnError(error) {
    if (error) {
      if (error.syscall !== 'listen') {
        throw error
      }

      let bind =
        typeof this.port === 'string'
          ? 'Pipe ' + this.port
          : 'Port ' + this.port

      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges')
          process.exit(1)
          break
        case 'EADDRINUSE':
          console.error(bind + ' is already in use')
          process.exit(1)
          break
        default:
          throw error
      }
    }
  }

  public OnListening() {
    let addr = this.server.address()
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    console.log('Listening on ' + bind)
  }

  private postResolveRequestCache: EventHandler<
    PayloadEventArgs<HttpContext>
  > = new EventHandler<PayloadEventArgs<HttpContext>>()
  public get PostResolveRequestCache(): EventHandler<
    PayloadEventArgs<HttpContext>
  > {
    return this.postResolveRequestCache
  }

  private preRequestHandlerExecute: EventHandler<
    PayloadEventArgs<HttpContext>
  > = new EventHandler<PayloadEventArgs<HttpContext>>()
  public get PreRequestHandlerExecute(): EventHandler<
    PayloadEventArgs<HttpContext>
  > {
    return this.preRequestHandlerExecute
  }

  private postRequestHandlerExecute: EventHandler<
    PayloadEventArgs<HttpContext>
  > = new EventHandler<PayloadEventArgs<HttpContext>>()
  public get PostRequestHandlerExecute(): EventHandler<
    PayloadEventArgs<HttpContext>
  > {
    return this.postRequestHandlerExecute
  }
}
