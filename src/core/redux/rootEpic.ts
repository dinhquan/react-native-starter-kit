import {signInsEpic} from 'core/redux/user/signIn';
import {combineEpics} from 'redux-observable';
import {getPostsEpic} from 'core/redux/post/getPosts';

const postEpic = combineEpics(getPostsEpic);

const userEpic = combineEpics(signInsEpic);

const rootEpic = combineEpics(postEpic, userEpic);

export default rootEpic;
