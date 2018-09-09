import { mvc, routing, HttpApplication } from './web'

export function Build(options: {
  registerRoutes?: (routes: routing.RouteDictionary) => void
  onApplicationStart?: () => void
}): HttpApplication {
  const application = new HttpApplication()
  const routes = new routing.RouteDictionary()
  if (options && options.registerRoutes) {
    options.registerRoutes(routes)
  }
  // tslint:disable-next-line:no-empty
  application.Application_Start = options.onApplicationStart || (() => {})
  application.RegisterModule(new routing.UrlRoutingModule(routes))
  application.Init()
  return application
}
