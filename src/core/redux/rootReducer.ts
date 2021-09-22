import {combineReducers} from '@reduxjs/toolkit';
import {userSlice} from 'core/redux/slices/userSlice';
import {postsSlice} from 'core/redux/slices/postsSlice';

const rootReducer = combineReducers({
  posts: postsSlice.reducer,
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
