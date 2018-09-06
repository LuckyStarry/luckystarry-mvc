import { IRouter } from './router'
import { RouteContext } from './route-context'

export interface IRouteCollection extends IRouter {
  Add(router: IRouter): void
}

export class RouteCollection implements IRouteCollection {
  private readonly routes: Array<IRouter> = []

  public Add(router: IRouter): void {
    this.routes.push(router)
  }

  public async RouteAsync(context: RouteContext): Promise<void> {
    throw new Error('未实现')
  }
}
