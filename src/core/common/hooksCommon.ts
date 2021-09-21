import {GenericState, ReduxStatus} from 'core/common/reduxCommon';
import {useEffect, useRef} from 'react';

export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function hasStateChanged<T>(prevState: GenericState<T> | undefined) {
  return !(prevState?.status !== ReduxStatus.Fetching);
}
