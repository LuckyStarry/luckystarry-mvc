import { IActionInvoker } from './action-invoker'
import { ActionContext } from './action-context'

export abstract class IActionInvokerFactory {
  public abstract CreateInvoker(actionContext: ActionContext): IActionInvoker
}
