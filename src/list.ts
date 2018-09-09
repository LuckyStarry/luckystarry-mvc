export interface IList<T> {
  Add(item: T): void
  Get(index: number): T
  Insert(index: number, item: T): void
  readonly Count: number
  [Symbol.iterator]()
}

export class List<T> implements IList<T> {
  private items: Array<T> = []
  public constructor(items?: Array<T> | IList<T>) {
    if (items) {
      if (items instanceof Array) {
        this.items = items.map(x => x)
      } else {
        for (let item of items) {
          this.items.push(item)
        }
      }
    }
  }

  public Insert(index: number, item: T): void {
    this.items = this.items.splice(index, 0, item)
  }

  public Add(item: T): void {
    this.items.push(item)
  }

  public Get(index: number): T {
    return this.items[index]
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
