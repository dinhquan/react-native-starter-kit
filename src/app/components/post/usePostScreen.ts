import {getPosts, postsSelector} from 'core/redux/slices/postsSlice';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function usePostScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const {data: posts} = useSelector(postsSelector);

  return {
    posts: posts ?? [],
  };
}

export default usePostScreen;
