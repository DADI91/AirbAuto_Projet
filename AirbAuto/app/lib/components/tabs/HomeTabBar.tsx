import React from 'react';
import {View, Pressable} from 'react-native';
import HomeTabTitle from './HomeTabTitle';
import {colors} from 'react-native-elements';
import {bindActionCreators} from 'redux';
import {
  updateBottomTabBar,
  updateIsModalVisible,
} from '../../../redux/actions/AppActions';
import {connect} from 'react-redux';
import HomeTabTitleStyle from '../../../ressources/style/HomeTabTitleStyle';

// Ce composant représente un bouton de l'onglet

// Ce composant représente la barre d'onglets
const MyTabBar = props => {
  //const nav = useNavigation();

  const {state, descriptors, navigation} = props;

  let backgroundColor = colors.white;
  if (state.index === 0) {
    backgroundColor = colors.black;
  } else if (state.index === 1) {
    backgroundColor = 'transparent';
    state.index = 1;
  } else if (state.index === 1) {
    backgroundColor = colors.black;
  }
  return (
    <View
      style={[
        HomeTabTitleStyle.homeTabBarView,
        {
          backgroundColor: state.index === 0 ? '#D2D2D2' : '#D2D2D2',
          borderTopColor: state.index === 0 ? '#F6F6F630' : '#12121230',
        },
      ]}>
      {state.routes.map((route, index) => {
        if (index >= 4) {
          return null;
        }
        const {options} = descriptors[route.key];
        //const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
        {
          console.log('je suis la je test ', state.index === index);
        ;}

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: false,
          });
          if (!isFocused && !event.defaultPrevented) {
            if (!props.connects) {
              navigation.navigate('Login');
            } else if (route.name === 'AddPost') {
              props.updateIsModalVisible(true);
            } else {
              navigation.navigate(route.name, {userDetail: false});
            }
          }
        };
        console.log('is connect', props.isBottomTabBarVisibre);
        const isFocused = state.index === index;

        return (
          <Pressable
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: false} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            // onLongPress={onLongPress}
            style={HomeTabTitleStyle.PressTabBar}>
            {(props.isBottomTabBarVisibre == undefined ||
              props.isBottomTabBarVisibre !== false) && (
              <HomeTabTitle
                focused={isFocused}
                name={route.name}
                backgroundColor={backgroundColor}
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

function mapStateToProps(state) {
  return {
    isBottomTabBarVisibre: state.app.isBottomTabBarVisibre,
    connects: state.app.connect,

    initApp: state.app.initApp,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        //actualScreenTab,
        updateIsModalVisible,
        updateBottomTabBar,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTabBar);

