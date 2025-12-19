import { Trans } from '@lingui/react/macro';
import { Note } from '@nilscox/music-tools';
import { Play } from 'lucide-react';
import { useCallback, useEffect } from 'react';

import { IntervalPicker } from '../../components/interval-picker';
import { QuestionText } from '../../components/question-text';
import { IntervalIdentificationQuestion } from '../../domain/questions';
import { answerSelected, selectPlayType, selectQuestionNumber } from '../../domain/session.slice';
import { QuestionProps } from '../../pages/session';
import { useAppDispatch, useAppSelector } from '../../store';

export function IntervalIdentification({
  piano,
  question,
  answer,
}: QuestionProps<IntervalIdentificationQuestion>) {
  const dispatch = useAppDispatch();
  const questionNumber = useAppSelector(selectQuestionNumber);
  const playType = useAppSelector(selectPlayType);

  const notes = useCallback(
    (value = question.interval) => [question.root, question.root.transpose(value)],
    [question],
  );

  const play = (notes: Note[]) => {
    piano.play(notes, playType);
  };

  useEffect(() => {
    play(notes());
  }, [notes]);

  return (
    <>
      <QuestionText number={questionNumber}>
        <div className="row justify-between items-center">
          <Trans>What is this interval?</Trans>
          <button type="button" onClick={() => play(notes())} className="self-center">
            <Play className="size-6" />
          </button>
        </div>
      </QuestionText>

      <IntervalPicker
        answer={answer ? question.interval : undefined}
        onSelected={(interval) => dispatch(answerSelected(interval))}
      />
    </>
  );
}
