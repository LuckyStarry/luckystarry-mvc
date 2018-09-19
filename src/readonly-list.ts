export abstract class IReadOnlyList<T> {
  public abstract get Count(): number
  public abstract [Symbol.iterator](): IterableIterator<T>
}

export class ReadOnlyList<T> implements IReadOnlyList<T> {
  private items: Array<T>
  public constructor() {
    this.items = new Array<T>()
  }

  public get Count(): number {
    return this.items.length
  }

  public *[Symbol.iterator](): IterableIterator<T> {
    for (let item of this.items) {
      yield item
    }
  }
}
