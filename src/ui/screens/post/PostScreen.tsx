import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getPosts, getPostsSelector} from 'core/features/post/getPosts';
import Post from 'core/models/post/Post';
import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import BaseText from 'ui/components/base/BaseText';
import {PostStackParamList} from 'ui/navigation/Params';
import Color from 'ui/theme/Color';

interface Props {
  route: RouteProp<PostStackParamList, 'Post'>;
  navigation: StackNavigationProp<PostStackParamList, 'Post'>;
}

function PostScreen(props: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const {data: posts} = useSelector(getPostsSelector);

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
  background-color: ${Color.Background};
`;
