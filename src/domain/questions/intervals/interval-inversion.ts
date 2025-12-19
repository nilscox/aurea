import { Interval } from '@nilscox/music-tools';

import { assert } from '../../../utils/assert';
import { randomItem, randomItems, shuffle } from '../../../utils/random';
import { Question } from '../question';

type IntervalInversionOptions = {
  intervals: Interval[];
};

export class IntervalInversionQuestion extends Question<IntervalInversionOptions, Interval> {
  readonly interval: Interval;
  readonly choices: Interval[];

  constructor(options: Partial<IntervalInversionOptions> = {}) {
    super({
      intervals: Array(12)
        .fill(null)
        .map((_, n) => new Interval(n)),
      ...options,
    });

    assert(this.options.intervals.length >= 1);

    this.interval = randomItem(this.options.intervals)!;
    this.choices = shuffle([this.correctAnswer, ...randomItems(this.options.intervals, 3)]);
  }

  get correctAnswer() {
    return this.interval.invert();
  }

  isCorrect(answer: Interval): boolean {
    return this.correctAnswer.equals(answer);
  }
}
