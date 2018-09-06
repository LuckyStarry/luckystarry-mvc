import http from 'http'
import { IServiceProvider, ServiceProvider } from './service-provider'
import { RequestDelegate } from './request-delegate'

export interface IApplicationBuilder {
  ApplicationServices: IServiceProvider

  Use(
    middleware: (request: RequestDelegate) => RequestDelegate
  ): IApplicationBuilder

  Build(): RequestDelegate
}

export class ApplicationBuilder implements IApplicationBuilder {
  private applicationServices: IServiceProvider
  private middlewares: Array<(request: RequestDelegate) => RequestDelegate> = []

  public Use(
    middleware: (request: RequestDelegate) => RequestDelegate
  ): IApplicationBuilder {
    this.middlewares.push(middleware)
    return this
  }

  public set ApplicationServices(value: IServiceProvider) {
    this.applicationServices = value
  }

  public get ApplicationServices(): IServiceProvider {
    return this.applicationServices
  }

  public Build(): RequestDelegate {
    let app: RequestDelegate = async context => Promise.resolve()
    for (let middleware of this.middlewares.reverse()) {
      app = middleware(app)
    }
    return app
  }
}
