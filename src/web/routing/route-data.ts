import { IRouteHandler } from './route-handler'

export class RouteData {
  private routeHandler: IRouteHandler
  private values: Map<string, any> = new Map<string, any>()
  private dataTokens: Map<string, any> = new Map<string, any>()

  public get Controller(): string {
    if (this.Values) {
      return this.Values.get('controller')
    }
  }

  public get ActionName(): string {
    if (this.Values) {
      return this.Values.get('action')
    }
  }

  public set RouteHandler(value: IRouteHandler) {
    this.routeHandler = value
  }

  public get RouteHandler(): IRouteHandler {
    return this.routeHandler
  }

  public get Values(): Map<string, any> {
    return this.values
  }

  public get DataTokens(): Map<string, any> {
    return this.dataTokens
  }
}
