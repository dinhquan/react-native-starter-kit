import {plainToClass, plainToClassFromExist} from 'class-transformer';
import {ClassType} from 'class-transformer/ClassTransformer';
import {GenericState} from './reduxCommon';

export function transformType<T>(state: GenericState<any>): GenericState<T | undefined> {
  return {
    ...state,
    data: state?.data as T | undefined,
  };
}

export function transformClass<T>(
  state: GenericState<any>,
  cls: ClassType<T>,
): GenericState<T | undefined> {
  return {
    ...state,
    data: plainToClass(cls, state?.data),
  };
}

export function transformClasses<T>(
  state: GenericState<any>,
  cls: ClassType<T>,
): GenericState<T[] | undefined> {
  return {
    ...state,
    data: plainToClass(cls, state?.data as Object[]),
  };
}

export function transformClassFromExist<T>(
  state: GenericState<any>,
  cls: ClassType<T>,
): GenericState<T | undefined> {
  return {
    ...state,
    data: plainToClassFromExist(new cls(), state?.data),
  };
}

export function transformClassesFromExist<T>(
  state: GenericState<any>,
  cls: ClassType<T>,
): GenericState<T[] | undefined> {
  const array = (state?.data as Object[]) || [];
  const data =
    state?.data === undefined ? undefined : array.map(x => plainToClassFromExist(new cls(), x));
  return {
    ...state,
    data: data,
  };
}

export function jsonToClasses<T>(json: any, cls: ClassType<T>): T[] {
  const array = (json as Object[]) || [];
  const data = array.map(x => plainToClassFromExist(new cls(), x));
  return data;
}

export function jsonToClass<T>(json: any, cls: ClassType<T>): T {
  return plainToClassFromExist(new cls(), json);
}
