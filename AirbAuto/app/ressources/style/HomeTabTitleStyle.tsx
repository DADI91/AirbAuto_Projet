import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const HomeTabTitleStyle = StyleSheet.create({
  textTab: {
    fontSize: 15,
    width: 100,
    textAlign: 'center',
    fontWeight: '600',
  },
  iconTab: {
    marginTop: 15,
  },

  viewTab: {
    width: wp(15),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  homeTabBarView: {
    flexDirection: 'row',
    elevation: 0,
    borderTopWidth: 1,
    height: heightPercentageToDP(10),
    alignItems: 'flex-start',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },

  PressTabBar: {
    flex: 1,
    alignItems: 'center',
    bottom: 10,
},
});

export default HomeTabTitleStyle;
