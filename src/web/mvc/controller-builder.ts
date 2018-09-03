import { IControllerFactory } from './controller-factory'

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
