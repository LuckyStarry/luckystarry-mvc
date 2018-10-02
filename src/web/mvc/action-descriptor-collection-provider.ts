import { ActionDescriptorCollection } from './action-descriptor-collection'

export abstract class IActionDescriptorCollectionProvider {
  public abstract get ActionDescriptors(): ActionDescriptorCollection
}

export abstract class ActionDescriptorCollectionProvider extends IActionDescriptorCollectionProvider {}

export class DefaultActionDescriptorCollectionProvider extends ActionDescriptorCollectionProvider {
  private _collection: ActionDescriptorCollection

  public get ActionDescriptors(): ActionDescriptorCollection {
    return this._collection
  }
}
