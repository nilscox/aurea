export function createArray<T>(length: number, init: (index: number) => T): T[] {
  return Array.from({ length }).map((_, index) => init(index));
}

export function arrayToggle<T>(array: T[], element: T): Array<T> {
  if (array.includes(element)) {
    return array.filter((value) => value !== element);
  }

  return [...array, element];
}
