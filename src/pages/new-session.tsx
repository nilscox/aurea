import { Trans } from '@lingui/react/macro';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from 'react-router';
import { keys } from 'remeda';
import { z } from 'zod';

import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/checkbox';

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
import { arrayToggle } from '../utils/array';
import { randomItems } from '../utils/random';

type QuestionType = keyof typeof questions;

const QuestionClasses = {
  IntervalInversionQuestion,
  IntervalIdentificationQuestion,
  IntervalToNoteQuestion,
  SemitonesToIntervalQuestion,
  NotesToIntervalQuestion,
};

const schema = z.object({
  questionsCount: z.number(),
  questionTypes: z
    .array(
      z.union([
        z.literal('IntervalIdentificationQuestion'),
        z.literal('IntervalInversionQuestion'),
        z.literal('IntervalToNoteQuestion'),
        z.literal('NotesToIntervalQuestion'),
        z.literal('SemitonesToIntervalQuestion'),
      ]),
    )
    .min(1),
});

export function NewSession() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      questionsCount: 12,
      questionTypes: keys(questions),
    },

    async onSubmit({ value }) {
      const Classes = randomItems(
        value.questionTypes.map((type) => QuestionClasses[type]),
        value.questionsCount,
      );

      const questions = Classes.map((Class) => new Class());

      dispatch(sessionStarted(questions));
      navigate('/session');
    },

    validators: {
      onSubmit: schema,
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    void form.handleSubmit();
  };

  const questionTypesTexts = {
    IntervalIdentificationQuestion: {
      label: <Trans>Interval identification</Trans>,
      description: <Trans>Find the interval between two played notes</Trans>,
    },
    IntervalInversionQuestion: {
      label: <Trans>Interval inversion</Trans>,
      description: <Trans>Find the inversion of an interval</Trans>,
    },
    IntervalToNoteQuestion: {
      label: <Trans>Note transposition</Trans>,
      description: <Trans>Find the outcome of transposing a note by an interval</Trans>,
    },
    NotesToIntervalQuestion: {
      label: <Trans>Interval from two notes</Trans>,
      description: <Trans>Find the interval between two notes</Trans>,
    },
    SemitonesToIntervalQuestion: {
      label: <Trans>Interval from semitones</Trans>,
      description: <Trans>Find the interval containing a given number of semitones</Trans>,
    },
  };

  return (
    <form onSubmit={handleSubmit} className="col gap-6 flex-1">
      <h1 className="text-center text-4xl font-bold my-8">
        <Trans>New session</Trans>
      </h1>

      <form.Field name="questionTypes">
        {(field) => (
          <div className="col gap-2">
            {keys(questions).map((type) => (
              <QuestionTypeOption
                key={type}
                type={type}
                label={questionTypesTexts[type].label}
                description={questionTypesTexts[type].description}
                checked={field.state.value.includes(type)}
                onChange={() => field.handleChange((value) => arrayToggle(value, type))}
              />
            ))}
            <div className="text-xs text-red-800">{field.state.meta.errors[0]?.message}</div>
          </div>
        )}
      </form.Field>

      <form.Field name="questionsCount">
        {(field) => (
          <div className="grid grid-cols-3 gap-2 items-center">
            {[6, 12, 24].map((count) => (
              <Button
                key={count}
                variant={field.state.value === count ? 'default' : 'outline'}
                onBlur={field.handleBlur}
                onClick={() => field.handleChange(count)}
              >
                {count} <Trans>questions</Trans>
              </Button>
            ))}
          </div>
        )}
      </form.Field>

      <Button type="submit" className="w-full! mt-auto!">
        <Trans>Start</Trans>
      </Button>
    </form>
  );
}

type QuestionTypeOption = {
  type: QuestionType;
  label: React.ReactNode;
  description: React.ReactNode;
  checked: boolean;
  onChange: () => void;
};

function QuestionTypeOption({ type, label, description, checked, onChange }: QuestionTypeOption) {
  return (
    <label htmlFor={type} className="border rounded-md px-3 py-1.5 has-checked:border-slate-500">
      <div className="font-medium row gap-2 items-center">
        <Checkbox id={type} checked={checked} onCheckedChange={onChange} />
        {label}
      </div>
      <div className="text-slate-700 text-sm">{description}</div>
    </label>
  );
}
