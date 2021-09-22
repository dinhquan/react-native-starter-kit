import BaseText from 'app/components/base/BaseText';
import Colors from 'app/theme/Colors';
import Post from 'core/models/post/Post';
import {getPosts, postsSelector} from 'core/redux/slices/postsSlice';
import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';

function PostScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const {data: posts} = useSelector(postsSelector);

  function renderItem({item: post}: {item: Post}) {
    return <BaseText>{post.name}</BaseText>;
  }

  return (
    <Container>
      <FlatList data={posts} renderItem={renderItem} keyExtractor={item => item.id + ''} />
    </Container>
  );
}

export default React.memo(PostScreen);

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.Background};
`;
