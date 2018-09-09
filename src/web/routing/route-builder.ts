import { IServiceProvider } from '../../service-provider'
import { IApplicationBuilder } from '../../application-builder'
import { IRouter } from './router'
import { RouteCollection } from './route-collection'

export interface IRouteBuilder {
  readonly ApplicationBuilder: IApplicationBuilder
  readonly ServiceProvider: IServiceProvider
  readonly Routes: Array<IRouter>
  DefaultHandler: IRouter

  Build(): IRouter
}

export class RouteBuilder implements IRouteBuilder {
  private applicationBuilder: IApplicationBuilder
  private serviceProvider: IServiceProvider
  private defaultHandler: IRouter
  private routes: IRouter[]

  public constructor(
    applicationBuilder: IApplicationBuilder,
    defaultHandler?: IRouter
  ) {
    this.applicationBuilder = applicationBuilder
    this.serviceProvider = applicationBuilder.ApplicationServices
    this.defaultHandler = defaultHandler
    this.routes = []
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

  public get Routes(): Array<IRouter> {
    return this.routes
  }

  public set DefaultHandler(value: IRouter) {
    this.defaultHandler = value
  }

  public get DefaultHandler(): IRouter {
    return this.defaultHandler
  }
}
