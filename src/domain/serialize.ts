import { createReduxMiddleware, defaultOptions, deserify } from '@karmaniverous/serify-deserify';
import { Chord, Interval, IntervalQuality, Note } from '@nilscox/music-tools';
import { pick } from 'remeda';

import {
  IntervalIdentificationQuestion,
  IntervalInversionQuestion,
  IntervalToNoteQuestion,
  NotesToIntervalQuestion,
  SemitonesToIntervalQuestion,
} from './questions';
import { Question } from './questions/question';

// cspell: words serify serifier deserifier

const opts: typeof defaultOptions = {
  ...defaultOptions,
  types: {
    ...defaultOptions.types,
    [Note.name]: {
      serifier: (note: Note) => note.toString(),
      deserifier: (str: string) => new Note(str),
    },
    [Interval.name]: {
      serifier: (interval: Interval) => interval.toString(),
      deserifier: (str: `${IntervalQuality}${number}`) => new Interval(str),
    },
    [Chord.name]: {
      serifier: (chord: Chord) => chord.toString(),
      deserifier: (str: string) => new Chord(str),
    },
    [IntervalIdentificationQuestion.name]: question(IntervalIdentificationQuestion),
    [IntervalInversionQuestion.name]: question(IntervalInversionQuestion),
    [IntervalToNoteQuestion.name]: question(IntervalToNoteQuestion),
    [NotesToIntervalQuestion.name]: question(NotesToIntervalQuestion),
    [SemitonesToIntervalQuestion.name]: question(SemitonesToIntervalQuestion),
  },
};

export const serializeMiddleware = createReduxMiddleware(opts);

export function deserialize<T>(value: unknown) {
  return deserify(value, opts) as T;
}

function question<Q extends Question>(ClassType: { new (...args: any[]): Q }) {
  return {
    serifier: (value: Q) => pick(value, attributes(value)),
    deserifier: (attributes: Record<string, unknown>) => Object.assign(new ClassType(), attributes),
  };
}

function attributes<T extends Record<string, any>>(object: T) {
  return Object.keys(object).filter((key) => typeof object[key] !== 'function') as Array<keyof T>;
}
