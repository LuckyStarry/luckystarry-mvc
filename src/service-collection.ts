import { IServiceContainer, ServiceContainer } from './service-container'

export interface IServiceCollection {
  AddTransient(type: Function)
  GetService<T>(type: { new (...args: Array<any>): T }): T
}

export class ServiceCollection implements IServiceCollection {
  private container: IServiceContainer

  public constructor(container?: IServiceContainer) {
    this.container = container || new ServiceContainer()
  }

  public AddTransient(type: Function) {
    this.container.AddService(type)
  }

  public GetService<T>(type: { new (...args: Array<any>): T }): T {
    return this.container.GetService(type)
  }
}
