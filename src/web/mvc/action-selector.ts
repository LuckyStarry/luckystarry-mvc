import { IReadOnlyList } from '../../readonly-list'
import { RouteContext } from '../routing/route-context'
import { ActionDescriptor } from './action-descriptor'

export interface IActionSelector {
  SelectCandidates(context: RouteContext): IReadOnlyList<ActionDescriptor>
  SelectBestCandidate(
    context: RouteContext,
    candidates: IReadOnlyList<ActionDescriptor>
  ): ActionDescriptor
}
