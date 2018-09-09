import { IHttpModule } from '../http-module'
import { HttpApplication } from '../http-application'
import { HttpContext } from '../http-context'
import { RouteTable } from './route-table'
import { RequestContext } from './request-context'
import { RouteDictionary } from './route-dictionary'

export class UrlRoutingModule implements IHttpModule {
  private routes: RouteDictionary
  public constructor(routes?: RouteDictionary) {
    this.routes = routes || RouteTable.Routes
  }

  public Init(context: HttpApplication): void {
    context.PostResolveRequestCache.Register((sender, e) => {
      this.PostResolveRequestCache(e.Payload)
    })
  }

  public PostResolveRequestCache(context: HttpContext) {
    let routeData = this.routes.GetRouteData(context)
    if (!routeData) {
      throw new Error(`未找到匹配的路由`)
    }
    let requestContext = new RequestContext(context, routeData)
    let handler = routeData.RouteHandler.GetHttpHandler(requestContext)
    context.RemapHandler(handler)
  }
}
