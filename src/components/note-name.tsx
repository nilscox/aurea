import { Trans } from '@lingui/react/macro';
import { Note } from '@nilscox/music-tools';

export function NoteName({ note }: { note: Note }) {
  const name = {
    C: <Trans>C</Trans>,
    D: <Trans>D</Trans>,
    E: <Trans>E</Trans>,
    F: <Trans>F</Trans>,
    G: <Trans>G</Trans>,
    A: <Trans>A</Trans>,
    B: <Trans>B</Trans>,
  }[note.pitchClass];

  const alteration = {
    '-2': <Trans>double flat</Trans>,
    '-1': <Trans>flat</Trans>,
    1: <Trans>sharp</Trans>,
    2: <Trans>double sharp</Trans>,
  }[note.alteration];

  return (
    <Trans id="Note name">
      {name}
      {alteration}
    </Trans>
  );
}
