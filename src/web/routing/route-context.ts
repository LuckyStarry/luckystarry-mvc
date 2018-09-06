import { HttpContext } from '../http-context'
import { RouteData } from './route-data'
import { RequestDelegate } from '../../request-delegate'

export class RouteContext {
  private httpContext: HttpContext
  private routeData: RouteData
  private requestDelegate: RequestDelegate

  public constructor(httpContext: HttpContext) {
    this.httpContext = httpContext
  }

  public set RequestDelegate(value: RequestDelegate) {
    this.requestDelegate = value
  }

  public get RequestDelegate(): RequestDelegate {
    return this.requestDelegate
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
}
