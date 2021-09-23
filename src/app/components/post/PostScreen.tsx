import BaseText from 'app/components/base/BaseText';
import Colors from 'app/theme/Colors';
import Post from 'core/models/post/Post';
import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import usePostScreen from './usePostScreen';

function PostScreen() {
  const {posts} = usePostScreen();

  function renderItem({item: post}: {item: Post}) {
    return <BaseText>{post.name}</BaseText>;
  }

  return (
    <Container>
      <BaseText>Posts</BaseText>
      <FlatList data={posts} renderItem={renderItem} keyExtractor={item => item.id + ''} />
    </Container>
  );
}

export default React.memo(PostScreen);

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.Background};
`;
