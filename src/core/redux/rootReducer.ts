import {combineReducers} from '@reduxjs/toolkit';
import {signInSlice} from 'core/features/user/signIn';
import {getPostsSlice} from '../features/post/getPosts';

const postReducer = combineReducers({
  getPosts: getPostsSlice.reducer,
});

const userReducer = combineReducers({
  signIn: signInSlice.reducer,
});

const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
