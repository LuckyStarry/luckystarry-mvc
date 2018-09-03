import { RouteDictionary } from './route-dictionary'

export class RouteTable {
  private static routes: RouteDictionary = new RouteDictionary()
  public static get Routes(): RouteDictionary {
    return RouteTable.routes
  }
}
