import { IActionInvoker } from './action-invoker'
import { ActionContext } from './action-context'

export interface IActionInvokerFactory {
  CreateInvoker(actionContext: ActionContext): IActionInvoker
}
