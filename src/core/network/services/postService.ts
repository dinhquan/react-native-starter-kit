import {request} from '../api';
import Config from '../config';

function getPosts() {
  return request(`${Config.baseUrl}/posts`, 'get');
}

export default {getPosts};
