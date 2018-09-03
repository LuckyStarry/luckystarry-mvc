import { ControllerCollection } from './controller'

export function RouteAttribute(options?: { template: string } | string) {
  return (controller, methodName: string, descriptor: PropertyDescriptor) => {
    let controllerName = controller.constructor.name
    if (/controller$/gi.test(controller.constructor.name)) {
      controllerName = controller.constructor.name.replace(/controller$/gi, '')
    }
    controllerName = controllerName.toLowerCase()
    let template = ''
    if (options) {
      if (typeof options === 'string') {
        template = options
      } else {
        template = options.template
      }
    }
    ControllerCollection.Current.AddRoutes(controllerName, {
      name: `${controllerName}-${methodName}`,
      template,
      options: {
        defaults: {
          controller: controllerName,
          action: methodName
        }
      }
    })
  }
}
