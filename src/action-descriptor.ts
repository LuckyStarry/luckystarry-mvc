import { Controller } from './controller'
import { HttpMethod } from './http-method'

export class ActionDescriptor {
  private path: string
  private controller: { new (): Controller }
  private actionName: string
  private httpMethod: HttpMethod
  private descriptor: PropertyDescriptor

  public constructor(path: string, controller: { new (): Controller }, actionName: string, httpMethod: HttpMethod, descriptor: PropertyDescriptor) {
    this.path = path
    this.controller = controller
    this.actionName = actionName
    this.httpMethod = httpMethod
    this.descriptor = descriptor
  }

  public get Path(): string {
    return this.path
  }

  public get Controller(): { new (): Controller } {
    return this.controller
  }

  public get ActionName(): string {
    return this.actionName
  }

  public get HttpMethod(): HttpMethod {
    return this.httpMethod
  }

  public get Descriptor(): PropertyDescriptor {
    return this.descriptor
  }
}
