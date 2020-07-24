import { HttpContext } from './http-context'

export interface ResponseContext {
  readonly HttpContext: HttpContext

  Status(code: number): ResponseContext

  Json(body: any): ResponseContext

  End(): void
}
