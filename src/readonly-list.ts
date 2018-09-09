export interface IReadOnlyList<T> {
  readonly Count: number
  [Symbol.iterator]()
}

export class ReadOnlyList<T> implements IReadOnlyList<T> {
  private items: Array<T>
  public constructor() {
    this.items = new Array<T>()
  }

  public get Count(): number {
    return this.items.length
  }

  public *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item
    }
  }
}
