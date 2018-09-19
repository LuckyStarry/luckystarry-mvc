import { IReadOnlyList } from 'readonly-list'
import { ActionDescriptor } from './action-descriptor'

export class ActionDescriptorCollection {
  private items: IReadOnlyList<ActionDescriptor>
  private version: number

  public constructor(items: IReadOnlyList<ActionDescriptor>, version: number) {
    this.items = items
    this.version = version
  }

  public get Items(): IReadOnlyList<ActionDescriptor> {
    return this.items
  }

  public get Version(): number {
    return this.version
  }
}
