import { Interval, Note } from '@nilscox/music-tools';

import { createArray } from '../../../utils/array';
import { assert } from '../../../utils/assert';
import { randomItem } from '../../../utils/random';
import { Question } from '../question';

type IntervalToNoteOptions = {
  intervals: Interval[];
  notes: Note[];
};

export class IntervalToNoteQuestion extends Question<IntervalToNoteOptions, Note> {
  readonly interval: Interval;
  readonly note: Note;

  constructor(options: Partial<IntervalToNoteOptions> = {}) {
    super({
      intervals: createArray(12, (n) => new Interval(n)),
      notes: 'CDEFGAB'.split('').map((note) => new Note(note)),
      ...options,
    });

    assert(this.options.intervals.length >= 1);
    assert(this.options.notes.length >= 1);

    this.interval = randomItem(this.options.intervals)!;
    this.note = randomItem(this.options.notes)!;
  }

  isCorrect(answer: Note): boolean {
    return this.note.transpose(this.interval).equals(answer);
  }
}
