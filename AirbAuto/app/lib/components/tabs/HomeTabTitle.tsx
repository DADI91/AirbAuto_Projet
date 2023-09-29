import React from 'react';
import {View, Text, ImageSourcePropType, Image} from 'react-native';
import colors from '../../../ressources/colors';
import images from '../../../ressources/stringsImage';
import HomeTabTitleStyle from '../../../ressources/style/HomeTabTitleStyle';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const HomeTabTitle = (props: {
  currentLanguage?: string;
  backgroundColor?: string;
  focused: boolean;
  name: string;
}) => {
  const {focused, name, backgroundColor} = props;
  let title = '';
  let iconName: string | number | null = '';
  let height = 0;
  let width = 0;
  console.log(name);
  switch (name) {
    case 'Explorer':
      height = widthPercentageToDP(6.4);
      width = widthPercentageToDP(6.4);
      iconName = focused ? images.SEARCH2 : images.SEARCH;
      title = 'Recherche';
      break;

    case 'AddPost':
      height = widthPercentageToDP(6.4);
      width = widthPercentageToDP(6.4);
      iconName = focused ? images.POST2 : images.POST1;
      title = 'Publier';
      break;
    case 'User':
      height = widthPercentageToDP(6.4);
      width = widthPercentageToDP(6.4);
      iconName = focused ? images.PROFIL4 : images.PROFIL3;
      title = 'Compte';
      break;

    default:
      iconName = '';
      height = widthPercentageToDP(6.04);
      width = widthPercentageToDP(5.6);
      title = '???????';
  }
  const colorText = focused ? '#98351C' : '#121212';

  return (
    <View style={HomeTabTitleStyle.viewTab}>
      {iconName && (
        <Image
          source={{
            uri: Image.resolveAssetSource(iconName as ImageSourcePropType).uri,
          }}
          style={{
            height: height,
            width: width,
            marginTop: 15,
            //alignSelf: name  === "AddProduct" ? "center" : "auto"
          }}
          resizeMode="cover"
        />
      )}

      <Text
        allowFontScaling={false}
        style={[
          HomeTabTitleStyle.textTab,
          {
            padding: title ? 10 : 0,
            color: colorText,
            //fontFamily: fonts.POPPINS_MEDIUM_IOS,
          },
        ]}>
        {title ? title : ''}
      </Text>
    </View>
  );
};

export default HomeTabTitle;
