import { Note } from '@nilscox/music-tools';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { assert } from '../utils/assert';
import { Accidental } from './accidental';
import { NoteName } from './note-name';
import { Option } from './option';

export function NotePicker({ answer, onSelected }: { answer?: Note; onSelected: (note: Note) => void }) {
  const [selectedPitchClass, setSelectedPitchClass] = useState<string>();
  const [selectedAlteration, setSelectedAlteration] = useState<0 | -1 | 1>();

  const didAnswer = answer !== undefined;

  useEffect(() => {
    if (!answer) {
      setSelectedPitchClass(undefined);
      setSelectedAlteration(undefined);
    }
  }, [answer]);

  return (
    <div className="col gap-8 items-center justify-center">
      <div className="grid grid-cols-4 gap-2">
        {'CDEFGAB'.split('').map((pitchClass) => (
          <Option
            key={pitchClass}
            didAnswer={didAnswer}
            isSelected={pitchClass === selectedPitchClass}
            isCorrect={pitchClass === answer?.pitchClass}
            onClick={() => setSelectedPitchClass(pitchClass === selectedPitchClass ? undefined : pitchClass)}
            className={clsx('w-16', { 'pointer-events-none': selectedPitchClass })}
          >
            <NoteName note={new Note(pitchClass)} />
          </Option>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {([-1, 0, 1] as const).map((alteration) => (
          <Option
            key={alteration}
            didAnswer={didAnswer}
            isSelected={alteration === selectedAlteration}
            isCorrect={alteration === answer?.alteration}
            onClick={() => {
              assert(selectedPitchClass && Note.isPitchClass(selectedPitchClass));
              setSelectedAlteration(alteration === selectedAlteration ? undefined : alteration);
              onSelected(new Note(selectedPitchClass, { alteration }));
            }}
            className={clsx('w-16', { 'pointer-events-none': selectedAlteration })}
          >
            <Accidental value={alteration} />
          </Option>
        ))}
      </div>
    </div>
  );
}
