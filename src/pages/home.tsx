import { Trans } from '@lingui/react/macro';
import { useNavigate } from 'react-router';

import { Button } from '../components/button';
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

export function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="col items-center justify-center h-full gap-6">
      <Button
        size={3}
        onClick={() => {
          dispatch(sessionStarted(createRandomSession()));
          navigate('/session');
        }}
      >
        <Trans>Start session</Trans>
      </Button>
    </div>
  );
}

function createRandomSession() {
  const classes = [
    IntervalInversionQuestion,
    IntervalIdentificationQuestion,
    IntervalToNoteQuestion,
    SemitonesToIntervalQuestion,
    NotesToIntervalQuestion,
    NotesToIntervalQuestion,
  ];

  return createArray(10, () => new (randomItem(classes)!)());
}
