import { Trans } from '@lingui/react/macro';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '../components/button';
import * as questions from '../domain/questions';
import {
  IntervalIdentificationQuestion,
  IntervalInversionQuestion,
  IntervalToNoteQuestion,
  NotesToIntervalQuestion,
  SemitonesToIntervalQuestion,
} from '../domain/questions';
import { sessionStarted } from '../domain/session.slice';
import { useAppDispatch } from '../store';
import { createArray } from '../utils/array';
import { randomItem } from '../utils/random';

type QuestionType = keyof typeof questions;

export function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [questionsCount, setQuestionsCount] = useState(10);
  const [questionType, setQuestionType] = useState<QuestionType>('IntervalIdentificationQuestion');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch(sessionStarted(createSession({ questionsCount, questionType })));
    navigate('/session');
  };

  return (
    <div className="col justify-center h-full gap-6">
      <form onSubmit={handleSubmit} className="col gap-4">
        <div>
          <label htmlFor="questionsCount" className="text-sm font-medium mb-2">
            <Trans>Number of questions</Trans>
          </label>
          <div className="row items-center gap-2">
            <input
              type="range"
              id="questionsCount"
              name="questionsCount"
              min={1}
              max={25}
              value={questionsCount}
              onChange={(event) => setQuestionsCount(event.target.valueAsNumber)}
              className="w-full"
            />

            <div className="mx-4">{questionsCount}</div>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">
            <Trans>Type of question</Trans>
          </div>

          <div className="col gap-1">
            <label className="row gap-2 items-center">
              <input
                type="radio"
                name="questionType"
                value="IntervalInversionQuestion"
                checked={questionType === 'IntervalInversionQuestion'}
                onChange={() => setQuestionType('IntervalInversionQuestion')}
              />
              IntervalInversion
            </label>

            <label className="row gap-2 items-center">
              <input
                type="radio"
                name="questionType"
                value="IntervalIdentificationQuestion"
                checked={questionType === 'IntervalIdentificationQuestion'}
                onChange={() => setQuestionType('IntervalIdentificationQuestion')}
              />
              IntervalIdentification
            </label>

            <label className="row gap-2 items-center">
              <input
                type="radio"
                name="questionType"
                value="IntervalToNoteQuestion"
                checked={questionType === 'IntervalToNoteQuestion'}
                onChange={() => setQuestionType('IntervalToNoteQuestion')}
              />
              IntervalToNote
            </label>

            <label className="row gap-2 items-center">
              <input
                type="radio"
                name="questionType"
                value="SemitonesToIntervalQuestion"
                checked={questionType === 'SemitonesToIntervalQuestion'}
                onChange={() => setQuestionType('SemitonesToIntervalQuestion')}
              />
              SemitonesToInterval
            </label>

            <label className="row gap-2 items-center">
              <input
                type="radio"
                name="questionType"
                value="NotesToIntervalQuestion"
                checked={questionType === 'NotesToIntervalQuestion'}
                onChange={() => setQuestionType('NotesToIntervalQuestion')}
              />
              NotesToInterval
            </label>
          </div>
        </div>

        <Button type="submit">Go!</Button>
      </form>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="border-b border-slate-400" />
        <div className="text-slate-600">
          <Trans>Or</Trans>
        </div>
        <div className="border-b border-slate-400" />
      </div>

      <Button
        size={3}
        onClick={() => {
          dispatch(sessionStarted(createRandomSession()));
          navigate('/session');
        }}
      >
        <Trans>Start random session</Trans>
      </Button>
    </div>
  );
}

type SessionOptions = {
  questionsCount: number;
  questionType: keyof typeof questions;
};

function createSession({ questionsCount, questionType }: SessionOptions) {
  const QuestionClass = {
    IntervalInversionQuestion,
    IntervalIdentificationQuestion,
    IntervalToNoteQuestion,
    SemitonesToIntervalQuestion,
    NotesToIntervalQuestion,
  }[questionType];

  return createArray(questionsCount, () => new QuestionClass());
}

function createRandomSession() {
  const classes = [
    IntervalInversionQuestion,
    IntervalIdentificationQuestion,
    IntervalToNoteQuestion,
    SemitonesToIntervalQuestion,
    NotesToIntervalQuestion,
  ];

  return createArray(10, () => new (randomItem(classes)!)());
}
