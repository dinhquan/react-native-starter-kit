import React from 'react';
import {Platform, Text} from 'react-native';

interface Props {
  title: string;
  font: FontName;
  color?: string;
  size?: number;
}

type FontName =
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5_Brands'
  | 'FontAwesome5_Regular'
  | 'FontAwesome5_Solid'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';

const FONT_MAP: Record<string, string> = {
  AntDesign: 'anticon',
  FontAwesome5_Brands: 'Font Awesome 5 Brands',
  FontAwesome5_Regular: 'Font Awesome 5 Free',
  FontAwesome5_Solid: 'Font Awesome 5 Free',
  MaterialCommunityIcons: 'Material Design Icons',
  MaterialIcons: 'Material Icons',
  Fontisto: 'fontisto',
  SimpleLineIcons: 'simple-line-icons',
  Zocial: 'Zocial',
};

function FontIcon(props: Props) {
  const {title, font, color, size} = props;
  const fontName = Platform.select({native: FONT_MAP[font] || font, web: font});
  return (
    <Text style={{fontFamily: fontName, color: color || 'black', fontSize: size || 20}}>
      {title}
    </Text>
  );
}

export default React.memo(FontIcon);
