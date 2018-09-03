import { Controller } from './controller'
import { RequestContext } from '../routing'

export class ControllerContext {
  private controller: Controller
  private requestContext: RequestContext

  public set Controller(value: Controller) {
    this.controller = value
  }

  public get Controller(): Controller {
    return this.controller
  }

  public set RequestContext(value: RequestContext) {
    this.requestContext = value
  }

  public get RequestContext(): RequestContext {
    return this.requestContext
  }
}
