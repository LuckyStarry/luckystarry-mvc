import { ControllerContext } from './controller-context'

export interface IActionInvoker {
  InvokeAction(controllerContext: ControllerContext, actionName: string): void
}
