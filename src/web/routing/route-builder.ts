import { IServiceProvider } from '../../service-provider'
import { IApplicationBuilder } from '../../application-builder'
import { IRouter } from './router'
import { RouteCollection } from './route-collection'
import { IList, List } from '../../list'

export interface IRouteBuilder {
  readonly ApplicationBuilder: IApplicationBuilder
  readonly ServiceProvider: IServiceProvider
  readonly Routes: IList<IRouter>
  DefaultHandler: IRouter

  Build(): IRouter
}

export class RouteBuilder implements IRouteBuilder {
  private applicationBuilder: IApplicationBuilder
  private serviceProvider: IServiceProvider
  private defaultHandler: IRouter
  private routes: IList<IRouter>

  public constructor(
    applicationBuilder: IApplicationBuilder,
    defaultHandler?: IRouter
  ) {
    this.applicationBuilder = applicationBuilder
    this.serviceProvider = applicationBuilder.ApplicationServices
    this.defaultHandler = defaultHandler
    this.routes = new List<IRouter>()
  }

  public Build(): IRouter {
    let routes = new RouteCollection()
    for (let router of this.Routes) {
      routes.Add(router)
    }
    return routes
  }

  public get ApplicationBuilder(): IApplicationBuilder {
    return this.applicationBuilder
  }

  public get ServiceProvider(): IServiceProvider {
    return this.serviceProvider
  }

  public get Routes(): IList<IRouter> {
    return this.routes
  }

  public set DefaultHandler(value: IRouter) {
    this.defaultHandler = value
  }

  public get DefaultHandler(): IRouter {
    return this.defaultHandler
  }
}
