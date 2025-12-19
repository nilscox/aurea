import { Trans } from '@lingui/react/macro';
import { Interval } from '@nilscox/music-tools';

import { IntervalPicker } from '../../components/interval-picker';
import { QuestionText } from '../../components/question-text';
import { SemitonesToIntervalQuestion } from '../../domain/questions';
import { answerSelected, selectQuestionNumber } from '../../domain/session.slice';
import { QuestionProps } from '../../pages/session';
import { useAppDispatch, useAppSelector } from '../../store';

export function SemitonesToInterval({ question, answer }: QuestionProps<SemitonesToIntervalQuestion>) {
  const dispatch = useAppDispatch();
  const questionNumber = useAppSelector(selectQuestionNumber);

  const semitones = <strong>{question.semitones}</strong>;

  return (
    <>
      <QuestionText number={questionNumber}>
        <Trans>Which interval contains {semitones} semitones?</Trans>
      </QuestionText>

      <IntervalPicker
        answer={answer ? new Interval(question.semitones) : undefined}
        onSelected={(answer) => dispatch(answerSelected(answer))}
      />
    </>
  );
}
