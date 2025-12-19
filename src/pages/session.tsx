import { Trans } from '@lingui/react/macro';
import { ArrowLeft } from 'lucide-react';
import { ComponentType, Fragment, use } from 'react';
import { Link } from 'react-router';

import { Button } from '../components/button';
import * as questions from '../domain/questions';
import { Question } from '../domain/questions/question';
import {
  questionCompleted,
  selectCorrectAnswers,
  selectCurrentAnswer,
  selectCurrentQuestion,
  selectIsSessionCompleted,
  selectQuestions,
  selectSessionProgress,
} from '../domain/session.slice';
import {
  IntervalIdentification,
  IntervalInversion,
  IntervalToNote,
  NotesToInterval,
  SemitonesToInterval,
} from '../questions';
import { useAppDispatch, useAppSelector } from '../store';
import { assert } from '../utils/assert';
import { Piano } from '../utils/piano';

const pianoPromise = (async () => {
  const piano = await Piano.load();

  piano.sampler.toDestination();
  await new Promise((r) => setTimeout(r, 500));

  return piano;
})();

export function Session() {
  const piano = use(pianoPromise);

  const correctAnswers = useAppSelector(selectCorrectAnswers);
  const questions = useAppSelector(selectQuestions);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const isSessionCompleted = useAppSelector(selectIsSessionCompleted);

  const score = () => {
    return `${correctAnswers.length} / ${questions.length}`;
  };

  return (
    <>
      {currentQuestion && (
        <>
          <Progress />
          <QuestionComponent piano={piano} />
        </>
      )}

      {isSessionCompleted && (
        <Fragment>
          <header>
            <Link to="/" className="items-center row gap-1">
              <ArrowLeft className="size-4" /> Retour
            </Link>
          </header>

          <div className="col items-center justify-center gap-4 flex-1">
            <div className="text-6xl">Terminé !</div>
            <div className="text-2xl text-center">Score : {score()}</div>
          </div>
        </Fragment>
      )}
    </>
  );
}

function Progress() {
  const progress = useAppSelector(selectSessionProgress);

  return (
    <div className="h-1 bg-slate-200 relative rounded-full">
      <div
        className="bg-slate-400 h-full rounded-full transition-all"
        style={{ width: `${progress! * 100}%` }}
      />
    </div>
  );
}

export type QuestionProps<Q extends Question> = {
  piano: Piano;
  question: Q;
  answer: null | QuestionAnswer<Q>;
};

type QuestionAnswer<Q extends Question> = Q extends Question<object, infer A> ? A : never;

const questionsMap = new Map<Function, ComponentType<QuestionProps<any>>>([
  [questions.IntervalIdentificationQuestion, IntervalIdentification],
  [questions.IntervalInversionQuestion, IntervalInversion],
  [questions.IntervalToNoteQuestion, IntervalToNote],
  [questions.NotesToIntervalQuestion, NotesToInterval],
  [questions.SemitonesToIntervalQuestion, SemitonesToInterval],
]);

function getQuestionComponent(question: Question) {
  return questionsMap.get(question.constructor) as React.ComponentType<QuestionProps<Question>>;
}

export function QuestionComponent({ piano }: { piano: Piano }) {
  const dispatch = useAppDispatch();

  const question = assert.defined(useAppSelector(selectCurrentQuestion));
  const answer = useAppSelector(selectCurrentAnswer);

  const Component = getQuestionComponent(question);

  return (
    <div className="flex-1 col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <Component piano={piano} question={question} answer={answer} />
      </div>

      <Button disabled={answer === null} onClick={() => dispatch(questionCompleted())} className="mt-4">
        <Trans>Continue</Trans>
      </Button>
    </div>
  );
}
