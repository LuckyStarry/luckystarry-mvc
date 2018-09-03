import { RequestContext } from '../routing'
import { IController, ControllerCollection } from './controller'
import { GetService } from '../../utils'

export interface IControllerFactory {
  CreateController(
    requestContext: RequestContext,
    controllerName: string
  ): IController
}

export class DefaultControllerFactory implements IControllerFactory {
  private controllerCollection: ControllerCollection

  public constructor(controllerCollection: ControllerCollection) {
    this.controllerCollection = controllerCollection
  }

  public CreateController(
    requestContext: RequestContext,
    controllerName: string
  ): IController {
    let type = this.controllerCollection.GetController(controllerName)
    let controller = GetService(type)
    return controller
  }
}
