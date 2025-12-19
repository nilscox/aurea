import { Interval, Note, PitchClass } from '@nilscox/music-tools';

import { createArray } from '../../../utils/array';
import { assert } from '../../../utils/assert';
import { randomItem } from '../../../utils/random';
import { Question } from '../question';

type IntervalIdentificationOptions = {
  intervals: Interval[];
  choices: Interval[];
};

export class IntervalIdentificationQuestion extends Question<IntervalIdentificationOptions, Interval> {
  readonly root: Note;
  readonly interval: Interval;
  readonly choices: Interval[];

  constructor(options: Partial<IntervalIdentificationOptions> = {}) {
    super({
      intervals: createArray(12, (n) => new Interval(n)),
      choices: createArray(12, (n) => new Interval(n)),
      ...options,
    });

    assert(this.options.intervals.length >= 1);

    this.root = randomItem('CDEFGAB'.split('').map((note) => new Note(note as PitchClass, { octave: 4 })))!;
    this.interval = randomItem(this.options.intervals)!;
    this.choices = this.options.choices;
  }

  isCorrect(answer: Interval): boolean {
    return this.interval.equals(answer);
  }
}
