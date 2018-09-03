import { IHttpModule } from '../http-module'
import { HttpApplication } from '../http-application'
import { HttpContext } from '../http-context'
import { RouteTable } from './route-table'
import { RequestContext } from './request-context'

export class UrlRoutingModule implements IHttpModule {
  public Init(context: HttpApplication): void {
    context.PostResolveRequestCache.Register((sender, e) => {
      this.PostResolveRequestCache(e.Payload)
    })
  }

  public PostResolveRequestCache(context: HttpContext) {
    let routeData = RouteTable.Routes.GetRouteData(context)
    if (!routeData) {
      throw new Error(`未找到匹配的路由`)
    }
    let requestContext = new RequestContext(context, routeData)
    let handler = routeData.RouteHandler.GetHttpHandler(requestContext)
    context.RemapHandler(handler)
  }
}
