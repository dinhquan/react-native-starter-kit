import React from 'react';
import {Text} from 'react-native';

function BaseText({children, ...rest}: any) {
  return (
    <Text allowFontScaling={false} {...rest}>
      {children}
    </Text>
  );
}

export default BaseText;
