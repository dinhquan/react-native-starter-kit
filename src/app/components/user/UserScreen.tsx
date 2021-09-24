import React from 'react';
import styled from 'styled-components/native';
import {Text} from '../base';
import {T, t} from 'app/theme/Localization';
import useUserScreen from './useUserScreen';
import Colors from 'app/theme/Colors';

function UserScreen() {
  const {user, hasSignedIn, onSignIn} = useUserScreen({username: 'quan', password: 'quan123'});
  return (
    <Container>
      <Text testID="sign-in-label">{hasSignedIn ? 'Signed In' : 'Not Signed In'}</Text>
      {hasSignedIn && <Text testID="name-label">{user!.getFullName()}</Text>}
      <Button onPress={onSignIn} testID="sign-in-button">
        <Text>{t(T.signIn)}</Text>
      </Button>
    </Container>
  );
}

export default React.memo(UserScreen);

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.Background};
`;

const Button = styled.TouchableOpacity`
  border-width: 1px;
  border-color: black;
  border-radius: 8px;
  padding: 10px 10px;
  margin-top: 10px;
  width: 100px;
`;
