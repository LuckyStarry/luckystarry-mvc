import { mvc, routing, HttpApplication } from './web'

export function Install(options: {
  controllers?: { new (...args: Array<any>): mvc.Controller }[]
  registerRoutes?: (routes: routing.RouteDictionary) => void
  onApplicationStart?: () => void
}) {
  let port = parseInt(process.env.PORT, 10)
  if (isNaN(port)) {
    port = 3000
  } else if (port < 10) {
    port = 3000
  } else if (port > 65535) {
    port = 3000
  }

  const application = new HttpApplication()
  // tslint:disable-next-line:no-empty
  application.Application_Start = options.onApplicationStart || (() => {})
  application.RegisterModule(new routing.UrlRoutingModule())
  application.Init()
  application.Start({ Port: port })
}
