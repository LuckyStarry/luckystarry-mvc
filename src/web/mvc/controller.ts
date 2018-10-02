import { HttpContext } from '../http-context'
import { RequestContext, RouteConfig } from '../routing'
import { ControllerContext } from './controller-context'

export interface IController {
  Execute(requestContext: RequestContext)
}

export abstract class Controller implements IController {
  private actionInvoker: ControllerActionInvoker
  private requestContent: RequestContext

  public constructor() {
    this.actionInvoker = new ControllerActionInvoker()
  }

  public set ActionInvoker(value: ControllerActionInvoker) {
    this.actionInvoker = value
  }

  public get ActionInvoker(): ControllerActionInvoker {
    return this.actionInvoker
  }

  public get RequestContext(): RequestContext {
    return this.requestContent
  }

  public get HttpContext(): HttpContext {
    return this.RequestContext.HttpContext
  }

  public Execute(requestContext: RequestContext) {
    let context = new ControllerContext()
    context.RequestContext = requestContext
    context.Controller = this
    this.requestContent = requestContext
    let actionName = requestContext.RouteData.ActionName
    this.ActionInvoker.InvokeAction(context, actionName)
  }
}
export class ControllerCollection {
  private controllers: Map<string, { new (...args: Array<any>): Controller }>
  private routes: Map<string, Map<string, RouteConfig>>

  public constructor() {
    this.controllers = new Map<
      string,
      { new (...args: Array<any>): Controller }
    >()
    this.routes = new Map<string, Map<string, RouteConfig>>()
  }

  public Add<T extends Controller>(
    name: string,
    controller: { new (...args: Array<any>): T }
  ): ControllerCollection {
    this.controllers.set(name, controller)
    console.log(`注册控制器：${name} => ${controller.name}`)
    return this
  }

  public AddRoutes(name: string, config: RouteConfig): ControllerCollection {
    if (!this.routes.has(name)) {
      this.routes.set(name, new Map<string, RouteConfig>())
    }
    this.routes.get(name).set(config.name, config)
    return this
  }

  public GetRoutes(name: string): Map<string, RouteConfig> {
    return this.routes.get(name)
  }

  public GetController(
    name: string
  ): { new (...args: Array<any>): Controller } {
    return this.controllers.get(name)
  }

  public static Current: ControllerCollection = new ControllerCollection()
}
