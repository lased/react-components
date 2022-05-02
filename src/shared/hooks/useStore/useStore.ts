/* eslint-disable react-hooks/rules-of-hooks */
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { useEffect, useState } from 'react';

import { ActionType } from 'store/store.types';

type Actions<T> = T extends { [key: string]: (...args: any) => any }
  ? T
  : never;

const useStore = <S, A>(
  store: Subject<S> | BehaviorSubject<S> | ReplaySubject<S>,
  reducer: (state: S, action: any) => S,
  actions: Actions<A>,
  initialState: S
) => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(null);

  const actionKeys = Object.keys(actions);
  const wrapActions = actionKeys.reduce(
    (acc, action) => ({
      ...acc,
      [action]: (...args: any[]) => {
        const result = actions[action](...args);

        if (result instanceof Promise) {
          result.then((action) => nextData(action)).catch(setError);
        } else {
          nextData(result);
        }
      }
    }),
    {} as A
  );

  const nextData = (action: ReturnType<ActionType<Actions<A>>>) =>
    store.next(reducer(data, action));

  useEffect(() => {
    const subscription$ = store.subscribe(setData);

    return () => subscription$.unsubscribe();
  }, []);
  useEffect(() => {
    if (error) {
      setError(null);
      throw new Error('Error');
    }
  }, [error]);

  return {
    ...wrapActions,
    data,
    error
  };
};

export default useStore;
