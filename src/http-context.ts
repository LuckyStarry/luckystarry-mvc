import { RequestContext } from './request-context'
import { ResponseContext } from './response-context'
export abstract class HttpContext {
  private request: RequestContext
  private response: ResponseContext

  public constructor(request: RequestContext, response: ResponseContext) {
    this.request = request
    this.response = response
  }

  public get Request(): RequestContext {
    return this.request
  }

  public get Response(): ResponseContext {
    return this.response
  }
}
