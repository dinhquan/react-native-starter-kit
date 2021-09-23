import * as ReactRedux from 'react-redux';
import {Action, Dispatch} from 'redux';

let _useDispatchSpy: jest.MockInstance<Dispatch<Action<any>>, []> | undefined;

export function mockUseDispatch() {
  jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(jest.fn());
}

export function mockUseSelector(value: any) {
  jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(value);
}
