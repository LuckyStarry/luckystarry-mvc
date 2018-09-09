import { IRouter } from '../routing/router'
import { RouteContext } from '../routing/route-context'
import { ActionContext } from './action-context'
import { IActionSelector } from './action-selector'
import { IActionInvokerFactory } from './action-invoker-factory'
import { IActionContextAccessor } from './action-context-accessor'
import { RoutingHttpContextExtensions } from '../routing/routing-http-context-extensions'

export class MvcRouteHandler implements IRouter {
  private actionSelector: IActionSelector
  private actionContextAccessor: IActionContextAccessor
  private actionInvokerFactory: IActionInvokerFactory

  public constructor(
    actionSelector: IActionSelector,
    actionContextAccessor: IActionContextAccessor,
    actionInvokerFactory: IActionInvokerFactory
  ) {
    this.actionSelector = actionSelector
    this.actionContextAccessor = actionContextAccessor
    this.actionInvokerFactory = actionInvokerFactory
  }

  public async RouteAsync(context: RouteContext): Promise<void> {
    if (context == null) {
      throw new Error('路由上下文不可为空')
    }

    context.Handler = async httpContext => {
      let routeData = RoutingHttpContextExtensions.GetRouteData(httpContext)

      let candidates = this.actionSelector.SelectCandidates(context)
      if (!candidates || candidates.Count === 0) {
        return Promise.reject()
      }

      let actionDescriptor = this.actionSelector.SelectBestCandidate(
        context,
        candidates
      )
      if (!actionDescriptor) {
        return Promise.reject()
      }

      let actionContext = new ActionContext(
        context.HttpContext,
        routeData,
        actionDescriptor
      )
      if (this.actionContextAccessor != null) {
        this.actionContextAccessor.ActionContext = actionContext
      }

      let invoker = this.actionInvokerFactory.CreateInvoker(actionContext)
      if (!invoker) {
        throw new Error('Action执行器不存在')
      }

      return await invoker.InvokeAsync()
    }
  }
}
