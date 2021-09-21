import {combineReducers} from '@reduxjs/toolkit';
import {signInSlice} from 'core/redux/user/signIn';
import {getPostsSlice} from 'core/redux/post/getPosts';

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
