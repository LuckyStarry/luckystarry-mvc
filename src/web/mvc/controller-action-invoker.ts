import { IActionInvoker } from './action-invoker'

export class ControllerActionInvoker implements IActionInvoker {
  public InvokeAsync(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
