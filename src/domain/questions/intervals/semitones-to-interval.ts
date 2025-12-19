import { Interval } from '@nilscox/music-tools';

import { assert } from '../../../utils/assert';
import { randomInteger } from '../../../utils/random';
import { Question } from '../question';

type SemitonesToIntervalOptions = {
  min: number;
  max: number;
};

export class SemitonesToIntervalQuestion extends Question<SemitonesToIntervalOptions, Interval> {
  readonly semitones: number;

  constructor(options: Partial<SemitonesToIntervalOptions> = {}) {
    super({ min: 1, max: 12, ...options });

    assert(this.options.min >= 1);
    assert(this.options.min < this.options.max);

    this.semitones = randomInteger(this.options.min, this.options.max);
  }

  isCorrect(answer: Interval): boolean {
    return answer.semitones === this.semitones;
  }
}
