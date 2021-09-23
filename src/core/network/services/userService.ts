import {request} from '../api';
import Config from '../config';

export interface SignInCredential {
  username: string;
  password: string;
}

function signIn(credential: SignInCredential) {
  return request(`${Config.baseUrl}/signIn`, 'post', credential);
}

export default {signIn};
