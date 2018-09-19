export abstract class IList<T> {
  public abstract Add(item: T): void
  public abstract Get(index: number): T
  public abstract Insert(index: number, item: T): void
  public abstract Contains(items: T): boolean
  public abstract Remove(items: T): boolean
  public abstract get Count(): number
  public abstract [Symbol.iterator](): IterableIterator<T>
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
    this.items.splice(index, 0, item)
  }

  public Add(item: T): void {
    this.items.push(item)
  }

  public Get(index: number): T {
    return this.items[index]
  }

  public Contains(item: T): boolean {
    return this.items.findIndex(x => x === item) >= 0
  }

  public Remove(item: T): boolean {
    let index = this.items.findIndex(x => x === item)
    if (index >= 0) {
      this.items.splice(index, 1)
      return true
    }
    return false
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
