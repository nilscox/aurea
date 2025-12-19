import { Trans } from '@lingui/react/macro';
import { Interval, IntervalQuality } from '@nilscox/music-tools';

export function IntervalNumberName({ number }: { number: number }) {
  return (
    {
      1: <Trans>unison</Trans>,
      2: <Trans>second</Trans>,
      3: <Trans>third</Trans>,
      4: <Trans>fourth</Trans>,
      5: <Trans>fifth</Trans>,
      6: <Trans>sixth</Trans>,
      7: <Trans>seventh</Trans>,
      8: <Trans>octave</Trans>,
      9: <Trans>ninth</Trans>,
      10: <Trans>tenth</Trans>,
      11: <Trans>eleventh</Trans>,
      12: <Trans>twelfth</Trans>,
      13: <Trans>thirteenth</Trans>,
      14: <Trans>fourteenth</Trans>,
      15: <Trans>double octave</Trans>,
    }[number] ?? null
  );
}

export function IntervalQualityName({ quality }: { quality: IntervalQuality }) {
  return (
    {
      P: <Trans>perfect</Trans>,
      M: <Trans>major</Trans>,
      m: <Trans>minor</Trans>,
      A: <Trans>augmented</Trans>,
      AA: <Trans>doubly augmented</Trans>,
      d: <Trans>diminished</Trans>,
      dd: <Trans>doubly diminished</Trans>,
    }[quality] ?? null
  );
}

export function IntervalName({ interval }: { interval: Interval }) {
  return (
    <Trans id="Interval name">
      <IntervalQualityName quality={interval.quality} /> <IntervalNumberName number={interval.number} />
    </Trans>
  );
}
