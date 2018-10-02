import { ActionContext } from './action-context'

export abstract class IActionContextAccessor {
  public abstract set ActionContext(value: ActionContext)
  public abstract get ActionContext(): ActionContext
}
