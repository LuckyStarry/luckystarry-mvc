import { mvc, routing, HttpApplication } from './web'

export function Install(options: {
  controllers: mvc.Controller[]
  registerRoutes: (routes: routing.RouteDictionary) => void
  onApplicationStart: () => void
}) {
  const controllers = new mvc.ControllerCollection()
  const application = new HttpApplication()
  application.Application_Start = options.onApplicationStart || (() => {})
  application.RegisterModule(new routing.UrlRoutingModule())
  application.Init()
  application.Start()
}
