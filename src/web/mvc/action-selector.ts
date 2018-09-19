import { IReadOnlyList } from '../../readonly-list'
import { RouteContext } from '../routing/route-context'
import { ActionDescriptor } from './action-descriptor'

export abstract class IActionSelector {
  public abstract SelectCandidates(
    context: RouteContext
  ): IReadOnlyList<ActionDescriptor>

  public abstract SelectBestCandidate(
    context: RouteContext,
    candidates: IReadOnlyList<ActionDescriptor>
  ): ActionDescriptor
}

export class ActionSelector extends IActionSelector {
  SelectCandidates(context: RouteContext): IReadOnlyList<ActionDescriptor> {
    throw new Error('Method not implemented.')
  }
  SelectBestCandidate(
    context: RouteContext,
    candidates: IReadOnlyList<ActionDescriptor>
  ): ActionDescriptor {
    throw new Error('Method not implemented.')
  }
}
