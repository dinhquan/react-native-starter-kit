import * as ReactRedux from 'react-redux';
import {Action, Dispatch} from 'redux';

let _useDispatchSpy: jest.MockInstance<Dispatch<Action<any>>, []> | undefined;

export function mockUseDispatch() {
  const useDispatchSpy = jest.spyOn(ReactRedux, 'useDispatch');
  useDispatchSpy.mockReturnValue(jest.fn());
  _useDispatchSpy = useDispatchSpy;
}

export function clearMocks() {
  _useDispatchSpy?.mockClear();
}
