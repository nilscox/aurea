import { Interval, Note } from '@nilscox/music-tools';

import { assert } from '../../../utils/assert';
import { randomItem } from '../../../utils/random';
import { Question } from '../question';

type NotesToIntervalOptions = {
  notes: Note[];
};

export class NotesToIntervalQuestion extends Question<NotesToIntervalOptions, Interval> {
  readonly note1: Note;
  readonly note2: Note;

  constructor(options: Partial<NotesToIntervalOptions> = {}) {
    super({
      notes: 'CDEFGAB'.split('').map((note) => new Note(note)),
      ...options,
    });

    assert(this.options.notes.length >= 2);

    this.note1 = randomItem(this.options.notes)!;
    this.note2 = randomItem(this.options.notes)!;

    if (this.note1.midi > this.note2.midi) {
      [this.note1, this.note2] = [this.note2, this.note1];
    }
  }

  isCorrect(answer: Interval): boolean {
    return new Interval(this.note1, this.note2).equals(answer);
  }
}
