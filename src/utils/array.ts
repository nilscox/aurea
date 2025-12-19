export function createArray<T>(length: number, init: (index: number) => T): T[] {
  return Array.from({ length }).map((_, index) => init(index));
}
