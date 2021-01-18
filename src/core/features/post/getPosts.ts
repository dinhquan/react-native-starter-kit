import {createSelector} from '@reduxjs/toolkit';
import Config from 'core/config/config';
import Category from 'core/models/post/Post';
import {request} from 'core/network/RestAPI';
import {transformClasses} from 'core/redux/classTransformer';
import {createEpic} from 'core/redux/epicCommon';
import {createReduxSlice} from 'core/redux/reduxCommon';
import {RootState} from 'core/redux/rootReducer';

const URL = `${Config.baseUrl}/posts`;

export const getPostsSlice = createReduxSlice<undefined>('getPosts');

export const getPosts = getPostsSlice.actions.request;

export const getPostsEpic = (action$: any) =>
  createEpic(action$, getPostsSlice, () => request(URL, 'get'));

export const getPostsSelector = createSelector(
  (state: RootState) => state.post.getPosts,
  item => transformClasses(item, Category),
);
