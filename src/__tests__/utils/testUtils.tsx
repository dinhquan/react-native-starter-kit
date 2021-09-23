import {configureStore} from '@reduxjs/toolkit';
import rootReducer from 'core/redux/rootReducer';
import * as ReactRedux from 'react-redux';

export const createTestStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export function mockUseDispatch() {
  jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(jest.fn());
}

export function mockUseSelector(value: any) {
  jest.spyOn(ReactRedux, 'useSelector').mockReturnValue(value);
}
