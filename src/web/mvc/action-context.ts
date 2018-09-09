import { HttpContext } from '../http-context'
import { RouteData } from '../routing/route-data'
import { ActionDescriptor } from './action-descriptor'

export class ActionContext {
  private httpContext: HttpContext
  private routeData: RouteData
  private actionDescriptor: ActionDescriptor

  public constructor(
    httpContext: HttpContext,
    routeData: RouteData,
    actionDescriptor: ActionDescriptor
  ) {
    if (httpContext == null) {
      throw new Error('HTTP上下文不可为空')
    }
    if (routeData == null) {
      throw new Error('路由数据不可为空')
    }
    if (actionDescriptor == null) {
      throw new Error('Action描述不可为空')
    }

    this.httpContext = httpContext
    this.routeData = routeData
    this.actionDescriptor = actionDescriptor
  }

  public set HttpContext(value: HttpContext) {
    this.httpContext = value
  }

  public get HttpContext(): HttpContext {
    return this.httpContext
  }

  public set RouteData(value: RouteData) {
    this.routeData = value
  }

  public get RouteData(): RouteData {
    return this.routeData
  }

  public set ActionDescriptor(value: ActionDescriptor) {
    this.actionDescriptor = value
  }

  public get ActionDescriptor(): ActionDescriptor {
    return this.actionDescriptor
  }
}
