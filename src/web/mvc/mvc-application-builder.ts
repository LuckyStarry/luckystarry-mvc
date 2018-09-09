import { IApplicationBuilder } from '../../application-builder'
import { IRouteBuilder, RouteBuilder } from '../routing'
import { HttpContext } from '../http-context'
import { IServiceProvider } from '../../service-provider'
import { RequestDelegate } from '../../request-delegate'
import { RouteBuilderExtensions } from '../routing/route-builder-extensions'
import { MvcRouteHandler } from './mvc-route-handler'

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
    configureRoutes?: (builder: IRouteBuilder) => void
  ): MvcApplicationBuilder {
    if (!configureRoutes) {
      // tslint:disable-next-line:no-empty
      configureRoutes = routes => {}
    }
    let routes = new RouteBuilder(app)
    routes.DefaultHandler = app.ApplicationServices.GetService(MvcRouteHandler)

    configureRoutes(routes)

    routes.Routes.Insert(
      0,
      AttributeRouting.CreateAttributeMegaRoute(app.ApplicationServices)
    )

    return app.UseRouter(routes.Build())
  }

  public static UseMvcWithDefaultRoute(
    app: IApplicationBuilder
  ): MvcApplicationBuilder {
    return MvcApplicationBuilder.UseMvc(app, routes => {
      RouteBuilderExtensions.MapRoute(
        routes,
        'default',
        '{controller=Home}/{action=Index}/{id?}'
      )
    })
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
