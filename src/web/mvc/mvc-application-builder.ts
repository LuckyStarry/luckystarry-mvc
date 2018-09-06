import http from 'http'
import { IApplicationBuilder } from '../../application-builder'
import {
  RouteDictionary,
  RouteTable,
  RequestContext,
  IRouteBuilder,
  RouteBuilder
} from '../routing'
import { HttpContext } from '../http-context'
import { IServiceProvider } from '../../service-provider'
import { RequestDelegate } from '../../request-delegate'

export abstract class MvcApplicationBuilder implements IApplicationBuilder {
  private app: IApplicationBuilder
  private configureRoutes: IRouteBuilder

  public set ApplicationServices(value: IServiceProvider) {
    this.app.ApplicationServices = value
  }

  public get ApplicationServices(): IServiceProvider {
    return this.app.ApplicationServices
  }

  public constructor(app: IApplicationBuilder, configureRoutes: IRouteBuilder) {
    this.app = app.Use(next => {
      return async context => {
        next(context)
        return await this.process(context)
      }
    })
    this.configureRoutes = configureRoutes
  }

  public static UseMvc(
    app: IApplicationBuilder,
    configureRoutes?: IRouteBuilder
  ): MvcApplicationBuilder {
    return new DefaultMvcApplicationBuilder(app, configureRoutes)
  }

  public static UseMvcWithDefaultRoute(
    app: IApplicationBuilder
  ): MvcApplicationBuilder {
    return MvcApplicationBuilder.UseMvc(app, new RouteBuilder(app))
  }

  private process(context: HttpContext): Promise<void> {
    // TODO 未实现的算法
    throw new Error('未实现的算法')
  }

  public Use(
    middleware: (request: RequestDelegate) => RequestDelegate
  ): IApplicationBuilder {
    return this.app.Use(middleware)
  }

  public Build(): RequestDelegate {
    return this.app.Build()
  }
}

class DefaultMvcApplicationBuilder extends MvcApplicationBuilder {
  public constructor(app: IApplicationBuilder, configureRoutes: IRouteBuilder) {
    super(app, configureRoutes)
  }
}
