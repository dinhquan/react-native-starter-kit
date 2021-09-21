import {createSelector} from '@reduxjs/toolkit';
import Config from 'core/redux/config';
import Post from 'core/models/post/Post';
import {request} from 'core/network/RestAPI';
import {transformClassesFromExist} from 'core/common/classTransformer';
import {createEpic} from 'core/common/epicCommon';
import {createReduxSlice} from 'core/common/reduxCommon';
import {RootState} from 'core/redux/rootReducer';

const URL = `${Config.baseUrl}/posts`;

export const getPostsSlice = createReduxSlice<undefined>('getPosts');

export const getPosts = getPostsSlice.actions.request;

export const getPostsEpic = (action$: any) =>
  createEpic(action$, getPostsSlice, () => request(URL, 'get'));

export const getPostsSelector = createSelector(
  (state: RootState) => state.post.getPosts,
  item => transformClassesFromExist(item, Post),
);
