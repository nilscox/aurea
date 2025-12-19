export function Accidental({ value }: { value: -1 | 0 | 1 }) {
  return {
    '-1': '♭',
    0: '♮',
    '1': '♯',
  }[String(value)];
}
