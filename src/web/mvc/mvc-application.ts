import { ControllerCollection } from './controller'
import { HttpApplication } from '../http-application'
import { ControllerBuilder } from './controller-builder'
import { DefaultControllerFactory } from './controller-factory'
import { UrlRoutingModule } from '../routing'

export abstract class MvcApplication extends HttpApplication {
  public constructor() {
    super()

    this.RegisterModule(new UrlRoutingModule())
  }

  public Application_Start(): void {
    ControllerBuilder.Current.SetControllerFactory(
      new DefaultControllerFactory(ControllerCollection.Current)
    )
  }
}
