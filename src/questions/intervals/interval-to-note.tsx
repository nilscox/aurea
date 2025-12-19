import { Trans } from '@lingui/react/macro';
import { useDispatch } from 'react-redux';

import { IntervalName } from '../../components/interval-name';
import { NoteName } from '../../components/note-name';
import { NotePicker } from '../../components/note-picker';
import { QuestionText } from '../../components/question-text';
import { IntervalToNoteQuestion } from '../../domain/questions';
import { answerSelected, selectQuestionNumber } from '../../domain/session.slice';
import { QuestionProps } from '../../pages/session';
import { useAppSelector } from '../../store';

export function IntervalToNote({ question, answer }: QuestionProps<IntervalToNoteQuestion>) {
  const dispatch = useDispatch();
  const questionNumber = useAppSelector(selectQuestionNumber);

  const note = (
    <strong>
      <NoteName note={question.note} />
    </strong>
  );

  const interval = (
    <strong>
      <IntervalName interval={question.interval} />
    </strong>
  );

  return (
    <>
      <QuestionText number={questionNumber}>
        <Trans>
          What note do we get when transposing a {note} of a {interval}?
        </Trans>
      </QuestionText>

      <NotePicker
        answer={answer ? question.note.transpose(question.interval) : undefined}
        onSelected={(note) => dispatch(answerSelected(note))}
      />
    </>
  );
}
