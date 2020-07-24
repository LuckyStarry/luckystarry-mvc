import core from 'express-serve-static-core'
import { HttpContext } from './http-context'
import { RequestContext } from './request-context'

export class DefaultRequestContext implements RequestContext {
  private context: HttpContext
  private request: core.Request
  public constructor(request: core.Request) {
    this.request = request
  }

  public set HttpContext(value: HttpContext) {
    this.context = value
  }

  public get HttpContext(): HttpContext {
    return this.context
  }

  public GetRoute(path: string): string {
    return this.request.params[path]
  }

  public GetQuery(name: string): string {
    return this.request.query[name]
  }

  public GetHeader(name: string): string {
    let header = this.request.headers[name]
    if (header) {
      if (typeof header === 'string') {
        return header
      }
      return header[0]
    }
  }

  public GetBody(): string {
    let body = this.request['rawBody']
    if (body) {
      return body.toString()
    }
    return null
  }
}
