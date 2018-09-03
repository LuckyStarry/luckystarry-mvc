import { Controller, ControllerCollection } from './controller'
import { RouteTable } from '../routing'

export function ControllerAttribute(options?: { path: string } | string) {
  return (controller: { new (...args: Array<any>): Controller }) => {
    let name = controller.name
    if (/controller$/gi.test(controller.name)) {
      name = controller.name.replace(/controller$/gi, '')
    }
    name = name.toLowerCase()
    ControllerCollection.Current.Add(name, controller)

    let path = options
    if (options) {
      if (typeof options === 'string') {
        path = options
      } else {
        path = options.path
      }
    }

    let routes = ControllerCollection.Current.GetRoutes(name)
    if (routes) {
      for (let [routeName, config] of Array.from(routes)) {
        RouteTable.Routes.MapRoute(
          Object.assign({}, config, {
            template: `/${`${path || ''}/${config.template}`
              .split('/')
              .filter(p => !!p)
              .join('/')}`
          })
        )
      }
    }
  }
}
