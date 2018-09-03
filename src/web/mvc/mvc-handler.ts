import { RequestContext } from '../routing'
import { IHttpHandler } from '../http-handler'
import { HttpContext } from '../http-context'
import { ControllerBuilder } from './controller-builder'

export class MvcHandler implements IHttpHandler {
  private requestContext: RequestContext

  public constructor(requestContext: RequestContext) {
    this.requestContext = requestContext
  }

  public set RequestContext(value: RequestContext) {
    this.requestContext = value
  }

  public get RequestContext(): RequestContext {
    return this.requestContext
  }

  public ProcessRequest(context: HttpContext) {
    let controllerName = this.RequestContext.RouteData.Controller
    let controllerFactory = ControllerBuilder.Current.GetControllerFactory()
    let controller = controllerFactory.CreateController(
      this.RequestContext,
      controllerName
    )
    if (!controller) {
      throw new Error(`无法找到名称为 "${controllerName}" 的控制器！`)
    }
    controller.Execute(this.RequestContext)
  }
}
