import { ControllerContext } from './controller-context'

export abstract class ActionResult {
  public abstract ExecuteResult(context: ControllerContext): void
}
