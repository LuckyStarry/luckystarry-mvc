import { RequestContext } from '../routing'
import { IController, ControllerCollection } from './controller'
import { ServiceContainer } from '../../service-container'

export abstract class IControllerFactory {
  public abstract CreateController(
    requestContext: RequestContext,
    controllerName: string
  ): IController
}

export class DefaultControllerFactory extends IControllerFactory {
  private controllerCollection: ControllerCollection

  public constructor(controllerCollection: ControllerCollection) {
    super()
    this.controllerCollection = controllerCollection
  }

  public CreateController(
    requestContext: RequestContext,
    controllerName: string
  ): IController {
    let type = this.controllerCollection.GetController(controllerName)
    let controller = ServiceContainer.Current.GetService(type)
    return controller
  }
}
