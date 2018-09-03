export function stringToInt(val: string, defaultValue: number = 0): number {
  let num = parseInt(val, 10)
  if (isNaN(num)) {
    return defaultValue
  }
  return num
}
