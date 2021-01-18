import {plainToClass} from 'class-transformer';
import {ClassType} from 'class-transformer/ClassTransformer';
import {GenericState} from './reduxCommon';

export function transformClass<T>(
  state: GenericState<unknown>,
  cls: ClassType<T>,
): GenericState<T> {
  return {
    ...state,
    data: plainToClass(cls, state.data),
  };
}

export function transformClasses<T>(
  state: GenericState<unknown>,
  cls: ClassType<T>,
): GenericState<T[]> {
  return {
    ...state,
    data: plainToClass(cls, state.data as Object[]),
  };
}
