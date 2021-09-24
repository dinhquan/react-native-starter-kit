import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

interface Props extends TextProps {
  children?: any;
}

function BaseText({children, style, ...rest}: Props) {
  return (
    <RNText style={style} allowFontScaling={false} {...rest}>
      {children}
    </RNText>
  );
}

export default BaseText;
