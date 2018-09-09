import uuid from 'uuid'
import { IDictionary } from '../../dictionary'

export class ActionDescriptor {
  private id: string
  private routeValues: IDictionary<string, string>

  public constructor() {
    this.Id = uuid()
  }

  public set Id(value: string) {
    this.id = value
  }

  public get Id(): string {
    return this.id
  }

  public set RouteValues(value: IDictionary<string, string>) {
    this.routeValues = value
  }

  public get RouteValues(): IDictionary<string, string> {
    return this.routeValues
  }
}
