import { IActionInvoker } from './action-invoker'
import { ControllerContext } from './controller-context'
import { ActionResult } from './action-result'
import { JsonResult } from './json-result'

export class ControllerActionInvoker implements IActionInvoker {
  public InvokeAction(
    controllerContext: ControllerContext,
    actionName: string
  ): void {
    let action: Function = controllerContext.Controller[actionName]
    if (action) {
      try {
        let result = action.call(controllerContext.Controller)
        if (result instanceof Promise) {
          let promise = result
          promise
            .then(r => handleResult(r, controllerContext))
            .catch(e => handleError(e, controllerContext))
        } else {
          handleResult(result, controllerContext)
        }
      } catch (e) {
        handleError(e, controllerContext)
      }
    } else {
      handleError(new Error('没有合适的方法来处理响应'), controllerContext)
    }
  }
}

function handleResult(
  result: any | ActionResult,
  controllerContext: ControllerContext
) {
  if (result instanceof ActionResult) {
    result.ExecuteResult(controllerContext)
  } else {
    handleResult(
      new JsonResult({
        success: true,
        message: '',
        entity: result
      }),
      controllerContext
    )
  }
}

function handleError(e: Error, controllerContext: ControllerContext) {
  if (e) {
    handleResult(
      new JsonResult({
        success: false,
        message: e.message || '系统发生异常',
        stack: e.stack
      }),
      controllerContext
    )
  }
}
