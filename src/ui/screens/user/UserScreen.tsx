import {signIn, SignInCredential, signInSelector} from 'core/features/user/signIn';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import BaseText from 'ui/components/base/BaseText';
import {T, t} from 'ui/theme/Localization';

function UserScreen() {
  const dispatch = useDispatch();

  function onSignIn() {
    const credential: SignInCredential = {username: 'username', password: 'Test1234'};
    dispatch(signIn(credential));
  }

  const {data: user} = useSelector(signInSelector);

  return (
    <Container>
      <BaseText>{`${t(T.user)}: ${user?.getFullName() || ''}`}</BaseText>
      <Button onPress={onSignIn}>
        <BaseText>{t(T.signIn)}</BaseText>
      </Button>
    </Container>
  );
}

export default React.memo(UserScreen);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-self: center;
`;

const Button = styled.TouchableOpacity`
  border-width: 1px;
  border-color: black;
  border-radius: 8px;
  padding: 10px 10px;
  margin-top: 10px;
`;
