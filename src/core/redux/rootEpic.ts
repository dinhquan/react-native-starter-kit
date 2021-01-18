import {signInsEpic} from 'core/features/user/signIn';
import {combineEpics} from 'redux-observable';
import {getPostsEpic} from '../features/post/getPosts';

const postEpic = combineEpics(getPostsEpic);

const userEpic = combineEpics(signInsEpic);

const rootEpic = combineEpics(postEpic, userEpic);

export default rootEpic;
