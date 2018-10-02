import { Route } from './route'
import { RouteData } from './route-data'
import { MvcRouteHandler } from '../mvc'
import { HttpContext } from '../http-context'
import { RouteConfig } from './route-config'

export class RouteDictionary {
  private configs: Map<string, Route>

  public constructor() {
    this.configs = new Map<string, Route>()
  }

  public Add(name: string, route: Route): void {
    this.configs.set(name, route)
  }

  public MapRoute(config: RouteConfig): void {
    let route = new Route()
    route.Url = config.template
    if (config.options) {
      route.Defaults = config.options.defaults
    }
    // route.RouteHandler = new MvcRouteHandler()
    console.log(
      `注册路由：${config.template} => defaults: ${JSON.stringify(
        config.options && config.options.defaults
      )}`
    )
    this.Add(config.name, route)
  }

  public GetRouteData(httpContext: HttpContext): RouteData {
    for (let [name, route] of Array.from(this.configs)) {
      let routeData = route.GetRouteData(httpContext)
      if (routeData) {
        return routeData
      }
    }
  }
}
