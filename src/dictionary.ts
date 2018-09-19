export abstract class IDictionary<TKey, TValue> {
  public abstract Add(key: TKey, value: TValue): void
  public abstract Set(key: TKey, value: TValue): void
  public abstract Get(key: TKey): TValue
  public abstract ContainsKey(key: TKey): boolean
  public abstract ContainsValue(value: TValue): boolean
  public abstract Remove(key: TKey): boolean
  public abstract get Count(): number
  public abstract [Symbol.iterator](): IterableIterator<[TKey, TValue]>
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
    this.Set(key, value)
  }

  public Set(key: TKey, value: TValue) {
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
