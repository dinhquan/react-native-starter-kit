import React from 'react';
import styled from 'styled-components/native';
import BaseText from 'app/components/base/BaseText';
import {T, t} from 'app/theme/Localization';
import useUserScreen from './useUserScreen';

function UserScreen() {
  const {user, hasSignedIn, onSignIn} = useUserScreen({username: 'quan', password: 'quan123'});
  return (
    <Container>
      <BaseText testID="sign-in-label">{hasSignedIn ? 'Signed In' : 'Not Signed In'}</BaseText>
      {hasSignedIn && <BaseText testID="name-label">{user!.getFullName()}</BaseText>}
      <Button onPress={onSignIn} testID="sign-in-button">
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
