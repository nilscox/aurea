import { Interval, IntervalQuality } from '@nilscox/music-tools';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { assert } from '../utils/assert';
import { IntervalNumberName, IntervalQualityName } from './interval-name';
import { Option } from './option';

type IntervalPickerProps = {
  answer?: Interval;
  onSelected: (interval: Interval) => void;
};

export function IntervalPicker({ answer, onSelected }: IntervalPickerProps) {
  const [selectedNumber, setSelectedNumber] = useState<number>();
  const [selectedQuality, setSelectedQuality] = useState<IntervalQuality>();

  const didAnswer = answer !== undefined;

  useEffect(() => {
    if (!answer) {
      setSelectedNumber(undefined);
      setSelectedQuality(undefined);
    }
  }, [answer]);

  const canSelectQuality = (quality: IntervalQuality) => {
    if (selectedNumber === undefined) {
      return false;
    }

    if (quality === answer?.quality) {
      return true;
    }

    if (quality === 'd' || quality === 'A') {
      return true;
    }

    if ([1, 4, 5, 8].includes(selectedNumber)) {
      return quality === 'P';
    }

    if ([2, 3, 6, 7].includes(selectedNumber)) {
      return quality === 'M' || quality === 'm';
    }
  };

  return (
    <div className="col gap-8 items-center justify-center">
      <div className="grid grid-cols-2 min-[28rem]:grid-cols-3 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
          <Option
            key={number}
            didAnswer={didAnswer}
            isSelected={number === selectedNumber}
            isCorrect={number === answer?.number}
            onClick={() => setSelectedNumber(number === selectedNumber ? undefined : number)}
            className={clsx('w-32', { 'pointer-events-none': selectedQuality })}
          >
            <IntervalNumberName number={number} />
          </Option>
        ))}
      </div>

      <div className="grid grid-cols-2 min-[28rem]:grid-cols-3 sm:grid-cols-4 gap-4">
        {(['P', 'M', 'm', 'A', 'd'] satisfies IntervalQuality[]).map((quality) => (
          <Option
            key={quality}
            didAnswer={didAnswer}
            isSelected={quality === selectedQuality}
            isCorrect={quality === answer?.quality}
            disabled={!canSelectQuality(quality)}
            onClick={() => {
              assert(selectedNumber);
              setSelectedQuality(quality);
              onSelected(new Interval(quality, selectedNumber));
            }}
            className={clsx('w-32', { 'pointer-events-none': selectedQuality })}
          >
            <IntervalQualityName quality={quality} />
          </Option>
        ))}
      </div>
    </div>
  );
}
