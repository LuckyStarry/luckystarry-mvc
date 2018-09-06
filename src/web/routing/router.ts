import { RouteContext } from './route-context'

export interface IRouter {
  RouteAsync(context: RouteContext): Promise<void>
}
