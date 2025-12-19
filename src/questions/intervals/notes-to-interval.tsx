import { Trans } from '@lingui/react/macro';
import { Interval } from '@nilscox/music-tools';

import { IntervalPicker } from '../../components/interval-picker';
import { NoteName } from '../../components/note-name';
import { QuestionText } from '../../components/question-text';
import { NotesToIntervalQuestion } from '../../domain/questions';
import { answerSelected, selectQuestionNumber } from '../../domain/session.slice';
import { QuestionProps } from '../../pages/session';
import { useAppDispatch, useAppSelector } from '../../store';

export function NotesToInterval({ question, answer }: QuestionProps<NotesToIntervalQuestion>) {
  const dispatch = useAppDispatch();
  const questionNumber = useAppSelector(selectQuestionNumber);

  const note1 = (
    <strong>
      <NoteName note={question.note1} />
    </strong>
  );

  const note2 = (
    <strong>
      <NoteName note={question.note2} />
    </strong>
  );

  return (
    <>
      <QuestionText number={questionNumber}>
        <Trans>
          What is the interval between a {note1} and a {note2}?
        </Trans>
      </QuestionText>

      <IntervalPicker
        answer={answer ? new Interval(question.note1, question.note2) : undefined}
        onSelected={(answer) => dispatch(answerSelected(answer))}
      />
    </>
  );
}
