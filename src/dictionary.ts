export interface IDictionary<TKey, TValue> {
  Add(key: TKey, value: TValue): void
  Get(key: TKey): TValue
  ContainsKey(key: TKey): boolean
  ContainsValue(value: TValue): boolean
  Remove(key: TKey): boolean
  readonly Count: number
  [Symbol.iterator](): IterableIterator<[TKey, TValue]>
}

export class Dictionary<TKey, TValue> implements IDictionary<TKey, TValue> {
  private items: Map<TKey, TValue>
  public constructor(items?: {
    [Symbol.iterator](): IterableIterator<[TKey, TValue]>
  }) {
    this.items = new Map<TKey, TValue>()
    if (items) {
      for (let [k, v] of items) {
        this.items.set(k, v)
      }
    }
  }

  public Add(key: TKey, value: TValue) {
    this.items.set(key, value)
  }

  public Get(key: TKey): TValue {
    return this.items.get(key)
  }

  public ContainsKey(key: TKey): boolean {
    return this.items.has(key)
  }

  public ContainsValue(value: TValue): boolean {
    for (let v of this.items.values()) {
      if (v === value) {
        return true
      }
    }
    return false
  }

  public Remove(key: TKey): boolean {
    return this.items.delete(key)
  }

  public get Count(): number {
    return this.items.size
  }

  public *[Symbol.iterator](): IterableIterator<[TKey, TValue]> {
    for (let item of this.items) {
      yield item
    }
  }
}
