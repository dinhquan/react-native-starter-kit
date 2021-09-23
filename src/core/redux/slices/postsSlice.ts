import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import Post from 'core/models/post/Post';
import {transformClassesFromExist} from 'core/common/classTransformer';
import {fulfilled, initialState, rejected, pending} from 'core/common/reduxCommon';
import {RootState} from 'core/redux/rootReducer';
import postService from 'core/network/services/postService';

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  return await postService.getPosts();
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPosts.pending, pending);
    builder.addCase(getPosts.fulfilled, fulfilled);
    builder.addCase(getPosts.rejected, rejected);
  },
});

export const postsSelector = createSelector(
  (state: RootState) => state.posts,
  item => transformClassesFromExist(item, Post),
);
