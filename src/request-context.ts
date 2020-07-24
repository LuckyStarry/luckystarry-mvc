import { HttpContext } from './http-context'

export interface RequestContext {
  readonly HttpContext: HttpContext
  GetHeader(name: string): string
  GetBody(): string
  GetQuery(name: string): string
  GetRoute(path: string): string
}
