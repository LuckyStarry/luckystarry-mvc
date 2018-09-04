import {
  IControllerFactory,
  DefaultControllerFactory
} from './controller-factory'
import { ControllerCollection } from './controller'

export class ControllerBuilder {
  public static Current: ControllerBuilder = new ControllerBuilder()

  private factoryThunk: () => IControllerFactory

  private constructor() {}

  public SetControllerFactory(controllerFactory: IControllerFactory) {
    this.factoryThunk = () => controllerFactory
  }

  public GetControllerFactory(): IControllerFactory {
    return this.factoryThunk()
  }
}

ControllerBuilder.Current.SetControllerFactory(
  new DefaultControllerFactory(ControllerCollection.Current)
)
