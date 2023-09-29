import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import Explorer from './home/Explorer';
import {
  GestureDirection,
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
  StackHeaderInterpolatedStyle,
  StackHeaderInterpolationProps,
  TransitionSpec,
} from '@react-navigation/stack/lib/typescript/src/types';

import HomeIndex from './home/HomeIndex';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {AppInit, updateBottomTabBar} from '../redux/actions/AppActions';
import AddPost from './home/AddPost';
import User from './home/User';

import LoginScreen from './login/LoginScreen';
import RegisterScreen from './login/RegisterScreen';
import addLocation from './addPublication/AddRental';
import AddVentee from './addPublication/AddSale';
import AddRental from './addPublication/AddRental';
import AddSale from './addPublication/AddSale';
import DetailPost from './addPublication/DetailPost';
import ListAnnonce from './addPublication/ListAnnonce';
import UpdatePost from './addPublication/UpdatePost';
import CreateReservation from './reservation/CreateReservation';
import ListMyReservation from './reservation/ListMyReservation';
import ListReservation from './reservation/ListReservation';

const Stack = createStackNavigator();

type myTransitionType = {
  gestureDirection: GestureDirection;
  transitionSpec: {
    open: TransitionSpec;
    close: TransitionSpec;
  };
  headerStyleInterpolator: ({
    current,
    next,
  }: StackHeaderInterpolationProps) => StackHeaderInterpolatedStyle;
  cardStyleInterpolator: ({
    current,
    next,
    inverted,
    layouts: {screen},
  }: StackCardInterpolationProps) => StackCardInterpolatedStyle;
};
const MyTransition: myTransitionType = {
  //gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

function AppIndex() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{gestureEnabled: false}}>
        <Stack.Screen
          name="Home"
          component={HomeIndex}
          options={{
            headerShown: false,
            ...MyTransition,
          }}
        />
        <Stack.Screen
          name="Explorer"
          component={Explorer}
          options={{
            headerShown: false,
            ...MyTransition,
          }}
        />
        <Stack.Screen
          name="AddPost"
          component={AddPost}
          options={{
            headerShown: false,
            ...MyTransition,
          }}
        />

        <Stack.Screen
          name="User"
          component={User}
          options={{
            headerShown: false,
            ...MyTransition,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            ...MyTransition,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
            ...MyTransition,
          }}
        />
        <Stack.Screen
          name="AddVente"
          component={AddSale}
          options={{
            headerShown: false,
            ...MyTransition,
          }}
        />
        <Stack.Screen
          name="AddLocation"
          component={AddRental}
          options={{
            headerShown: false,
            ...MyTransition,
          }}
        />
        <Stack.Screen
          name="DetailPost"
          component={DetailPost}
          options={{
            headerShown: false,
            ...MyTransition,
          }}
        />
        <Stack.Screen
          name="ListAnnonce"
          component={ListAnnonce}
          options={{
            headerShown: false,
            ...MyTransition,
          }}
        />
        <Stack.Screen
          name="UpdatePost"
          component={UpdatePost}
          options={{
            headerShown: false,
            ...MyTransition,
          }}
        />
        <Stack.Screen
          name="NewReserv"
          component={CreateReservation}
          options={{
            headerShown: false,
            ...MyTransition,
          }}
        />
        <Stack.Screen
          name="ListReservation"
          component={ListReservation}
          options={{
            headerShown: false,
            ...MyTransition,
          }}
        />
        <Stack.Screen
          name="ListMyReservation"
          component={ListMyReservation}
          options={{
            headerShown: false,
            ...MyTransition,
          }}
        />
        {/* ... Autres écrans */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function mapStateToProps(state) {
  return {
    currentLanguage: state.app.currentLanguage,
    isConnected: state.app.isConnected,
    initApp: state.app.initApp,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        AppInit,
        updateBottomTabBar,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex);
