import { IServiceCollection } from 'luckystarry-ioc'
import { ActionDescriptor } from './action-descriptor'
import { Controller } from './controller'
import { HttpContext } from './http-context'

export class ControllerFactory {
  private services: IServiceCollection
  private mappings: Map<string, { new (): Controller }>
  public constructor(services: IServiceCollection) {
    this.services = services
    this.mappings = new Map()
  }

  public CreateController(descriptor: ActionDescriptor, context: HttpContext): Controller {
    let type = this.mappings.get(`${descriptor.HttpMethod}:${descriptor.Path}`)
    if (type) {
      let controller = this.services.GetService(type)
      controller.Context = context
      return controller
    }
  }

  public Register(descriptor: ActionDescriptor) {
    this.services.AddTransient(descriptor.Controller)
    this.mappings.set(`${descriptor.HttpMethod}:${descriptor.Path}`, descriptor.Controller)
  }
}
