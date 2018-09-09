import { IRouteHandler } from './route-handler'
import { IRouter } from './router'
import { RouteDataSnapshot } from './route-data-snapshot'

export class RouteData {
  private routeHandler: IRouteHandler
  private values: Map<string, any> = new Map<string, any>()
  private dataTokens: Map<string, any> = new Map<string, any>()
  private routers: Array<IRouter> = []

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

  public set Routers(value: Array<IRouter>) {
    this.routers = value
  }

  public get Routers(): Array<IRouter> {
    return this.routers
  }

  public set Values(value: Map<string, any>) {
    this.values = value
  }

  public get Values(): Map<string, any> {
    return this.values
  }

  public set DataTokens(value: Map<string, any>) {
    this.dataTokens = value
  }

  public get DataTokens(): Map<string, any> {
    return this.dataTokens
  }

  public PushState(
    router: IRouter,
    values: Map<string, any>,
    dataTokens: Map<string, any>
  ): RouteDataSnapshot {
    let snapshot = new RouteDataSnapshot(
      this,
      this.dataTokens,
      this.routers,
      this.values
    )

    if (router) {
      this.Routers.push(router)
    }
    if (values) {
      for (let [key, value] of Array.from(values)) {
        this.Values.set(key, value)
      }
    }
    if (dataTokens) {
      for (let [key, value] of Array.from(dataTokens)) {
        this.DataTokens.set(key, value)
      }
    }

    return snapshot
  }
}
