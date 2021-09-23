import {configureStore} from '@reduxjs/toolkit';
import {ReduxStatus} from 'core/common/reduxCommon';
import rootReducer, {RootState} from 'core/redux/rootReducer';

export const mockState: RootState = {
  posts: {
    isFetching: false,
    status: ReduxStatus.None,
    actionType: 'getPosts',
    success: true,
    data: [
      {
        id: 1,
        name: 'Title 1',
        description: 'Description 1',
      },
      {
        id: 2,
        name: 'Title 2',
        description: 'Description 2',
      },
    ],
  },
  user: {
    isFetching: false,
    status: ReduxStatus.None,
    actionType: 'signIn',
    success: true,
    data: {
      firstName: 'Quan',
      lastName: 'Nguyen',
      phoneNumber: '0439473244',
    },
  },
};

const createMockStore = () =>
  configureStore({
    reducer: rootReducer,
    // @ts-ignore
    preloadedState: mockState,
  });

export default createMockStore;
