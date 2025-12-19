import { Trans } from '@lingui/react/macro';

import { IntervalName } from '../../components/interval-name';
import { IntervalPicker } from '../../components/interval-picker';
import { QuestionText } from '../../components/question-text';
import { IntervalInversionQuestion } from '../../domain/questions';
import { answerSelected, selectQuestionNumber } from '../../domain/session.slice';
import { QuestionProps } from '../../pages/session';
import { useAppDispatch, useAppSelector } from '../../store';

export function IntervalInversion({ question, answer }: QuestionProps<IntervalInversionQuestion>) {
  const dispatch = useAppDispatch();
  const questionNumber = useAppSelector(selectQuestionNumber);

  const interval = (
    <strong>
      <IntervalName interval={question.interval} />
    </strong>
  );

  return (
    <>
      <QuestionText number={questionNumber}>
        <Trans>What is the inversion of a {interval}?</Trans>
      </QuestionText>

      <IntervalPicker
        answer={answer ? question.correctAnswer : undefined}
        onSelected={(interval) => dispatch(answerSelected(interval))}
      />
    </>
  );
}
