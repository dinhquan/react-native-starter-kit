import {createSelector} from '@reduxjs/toolkit';
import {from, of} from 'rxjs';
import {catchError, filter, map, mergeMap} from 'rxjs/operators';
import Category from 'core/models/post/Post';
import {createReduxSlice} from 'core/redux/reduxCommon';
import {RootState} from 'core/redux/rootReducer';
import {transformClasses} from 'core/redux/classTransformer';
import {request} from 'core/network/RestAPI';
import Config from 'core/config/config';

export const getPostsSlice = createReduxSlice<undefined>('getPosts');

export const {request: getPosts} = getPostsSlice.actions;

export const getPostsEpic = (action$: any) => {
  return action$.pipe(
    filter(getPosts.match),
    mergeMap(() =>
      from(request(URL, 'get')).pipe(
        map(getPostsSlice.actions.success),
        catchError(error => of(getPostsSlice.actions.failure(error))),
      ),
    ),
  );
};

export const getPostsSelector = createSelector(
  (state: RootState) => state.post.getPosts,
  item => transformClasses(item, Category),
);

const URL = `${Config.baseUrl}/posts`;
