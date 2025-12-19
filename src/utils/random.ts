export function randomBoolean(probability = 0.5): boolean {
  return Math.random() < probability;
}

export function randomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomInteger(min: number, max: number): number {
  return Math.floor(randomNumber(min, max));
}

export function randomItem<T>(array: readonly T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)]!;
}

export function randomItems<T>(input: readonly T[], count: number) {
  const items: T[] = [];
  const result: T[] = [];

  for (let i = 0; i < count; ++i) {
    if (items.length === 0) {
      items.push(...shuffle(input));
    }

    result.push(items.pop()!);
  }

  return shuffle(result);
}

export function shuffle<T>(array: readonly T[]): T[] {
  const result = array.slice();

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }

  return result;
}
