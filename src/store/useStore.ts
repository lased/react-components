import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

import { ActionsType, ActionType } from './store.types';

const stores: { [key: string]: BehaviorSubject<any> } = {};

const useStore = <S, A>(
  storeName: string,
  reducer: (state: S, action: any) => S,
  actions: ActionsType<A>,
  initialState: S
) => {
  const [data, setData] = useState(initialState);

  const actionKeys = Object.keys(actions);
  const wrapActions = actionKeys.reduce(
    (acc, action) => ({
      ...acc,
      [action]: (...args: any[]) => {
        nextData(actions[action](...args));
      }
    }),
    {} as A
  );

  const nextData = (action: ReturnType<ActionType<ActionsType<A>>>) => {
    stores[storeName].next(reducer(data, action));
  };

  useEffect(() => {
    if (!stores[storeName]) {
      stores[storeName] = new BehaviorSubject(initialState);
    }

    const subscription$ = stores[storeName].subscribe(setData);

    return () => subscription$.unsubscribe();
  }, []);

  return {
    ...wrapActions,
    data
  };
};

export default useStore;
