import Colors from 'app/theme/Colors';
import Post from 'core/models/post/Post';
import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {Text} from '../base';
import usePostScreen from './usePostScreen';

function PostScreen() {
  const {posts} = usePostScreen();

  function renderItem({item: post}: {item: Post}) {
    return <Text>{post.name}</Text>;
  }

  return (
    <Container>
      <Text>Posts</Text>
      <FlatList data={posts} renderItem={renderItem} keyExtractor={item => item.id + ''} />
    </Container>
  );
}

export default React.memo(PostScreen);

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.Background};
`;
