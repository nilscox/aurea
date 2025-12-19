import { combine, createSelector, pipe } from '@nilscox/selektor';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { assert } from '../utils/assert';
import { Question } from './questions/question';
import { deserialize } from './serialize';
import { AppState } from './store';

export type PlayType = 'harmonic' | 'melodic';

type Session = {
  playType: PlayType;
  questions: Array<Question>;
  questionIndex: number | null;
  answers: unknown[];
};

const initialState: Session = {
  playType: 'harmonic',
  questions: [],
  questionIndex: null,
  answers: [],
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    sessionStarted(state, { payload }: PayloadAction<Array<Question>>) {
      state.questions = payload;
      state.questionIndex = 0;
      state.answers = [];
    },

    onPlayTypeChanged(state, { payload }: PayloadAction<PlayType>) {
      state.playType = payload;
    },

    answerSelected(state, { payload }: PayloadAction<unknown>) {
      assert(state.questionIndex !== null);
      state.answers[state.questionIndex] = payload;
    },

    questionCompleted(state) {
      state.questionIndex ??= 0;
      state.questionIndex++;

      if (state.questionIndex >= state.questions.length) {
        state.questionIndex = null;
      }
    },
  },
});

export const { sessionStarted, onPlayTypeChanged, answerSelected, questionCompleted } = sessionSlice.actions;

export const selectSession = createSelector((state: AppState) => state.session);

export const selectPlayType = pipe(selectSession, (session) => {
  return session.playType;
});

export const selectQuestionNumber = pipe(selectSession, (session) => {
  return session.questionIndex !== null ? session.questionIndex + 1 : null;
});

export const selectIsSessionCompleted = pipe(selectSession, (session) => {
  return session.questions.length === session.answers.length && session.questionIndex === null;
});

export const selectQuestions = pipe(selectSession, (session) => {
  return session.questions.map(deserialize<Question>);
});

export const selectCurrentQuestion = combine(selectSession, selectQuestions, (session, questions) => {
  return questions[session.questionIndex ?? -1] ?? null;
});

export const selectAnswers = pipe(selectSession, (session) => session.answers.map(deserialize));

export const selectCorrectAnswers = combine(selectQuestions, selectAnswers, (questions, answers) => {
  return answers.filter((answer, index) => questions[index]?.isCorrect(answer));
});

export const selectCurrentAnswer = combine(selectSession, selectAnswers, (session, answers) => {
  return answers[session.questionIndex ?? -1] ?? null;
});

export const selectIsAnswerCorrect = combine(
  selectCurrentQuestion,
  selectCurrentAnswer,
  (question, answer) => {
    return Boolean(question && answer && question.isCorrect(answer));
  },
);

export const selectSessionProgress = combine(
  selectQuestions,
  selectQuestionNumber,
  (questions, questionNumber) => {
    return questionNumber !== null ? questionNumber / (questions.length + 1) : null;
  },
);
