import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState } from './domain/store';

export function useAppDispatch(): AppDispatch {
  return useDispatch();
}

interface AppSelector<ReturnType, Parameters extends unknown[]> {
  (state: AppState, ...params: Parameters): ReturnType;
}

export const useAppSelector = <ReturnType, Parameters extends unknown[]>(
  selector: AppSelector<ReturnType, Parameters>,
  ...params: Parameters
) => {
  return useSelector((state: AppState) => selector(state, ...params));
};
