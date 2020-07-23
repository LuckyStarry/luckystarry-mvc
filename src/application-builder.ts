import ioc, { IServiceCollection } from 'luckystarry-ioc'
import { ControllerFactory } from './controller-factory'
import { Application } from './application'

export class ApplicationBuider {
  private collection: IServiceCollection
  private port: number = 3000

  public static Create(collection?: IServiceCollection): ApplicationBuider {
    let application = new ApplicationBuider().UsePort(3000)
    application.collection = collection || ioc
    return application
  }

  public UseService(register: (services: IServiceCollection) => void): ApplicationBuider {
    register(this.collection)
    return this
  }

  public UsePort(port: number): ApplicationBuider {
    this.port = port
    return this
  }

  public Build(): Application {
    return new Application(this.collection, new ControllerFactory(this.collection), this.port)
  }
}
