/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, View, Text} from 'react-native';

import {connect, useDispatch} from 'react-redux';

import {bindActionCreators} from 'redux';
import {
  AppInit,
  resetState,
  updateBottomTabBar,
  updateIsModalVisible,
} from '../../redux/actions/AppActions';
import Svg, {ClipPath, Defs, G, Mask, Path} from 'react-native-svg';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import AddModal from '../../lib/components/AddModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ExplorerType {
  navigation;
  route;
  AppInit: Function;
  initApp;
  isBottomTabBarVisibre;
  updateBottomTabBar;
  isModalVisible;
  updateIsModalVisible: Function;
}
type showMessage = {
  message: string;
  duration: number;
};

const User = (props: ExplorerType) => {
  const dispatch = useDispatch();

  const upIsModalVisibles = () => {
    props.updateIsModalVisible(false);
  };
  const handleLogout = async () => {
    props.updateBottomTabBar(true);

    // Suppose resetState() retourne une promesse
    await dispatch(resetState());

    // Clear AsyncStorage
    await AsyncStorage.clear();

    // Navigate to Explorer
    props.navigation.reset({
      index: 0,
      routes: [{name: 'Explorer'}],
    });
  };
  return (
    <View
      style={[
        {
          display: 'flex',
          alignItems: 'center',
          borderStyle: 'solid',
          height: '100%',
          width: '100%',
        },
      ]}>
      <AddModal
        active={props.isModalVisible}
        onQuitPressed={upIsModalVisibles}
        text={''}
        navigation={props.navigation}
      />
      <Pressable
        onPress={() => {
          handleLogout();
        }}
        style={{
          width: 30,
          height: 30,
          position: 'absolute',
          top: 95,
          right: 15,
          //          top:'5%' ,left:"2%",borderRadius : "4px",
        }}>
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          {...props}>
          <Path
            stroke="#242424"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </Svg>
      </Pressable>
      <View
        style={[
          {
            alignItems: 'center',
            marginTop: 80,
            height: 60,
            width: 300,
          },
        ]}>
        <Svg
          width={143}
          height={47}
          viewBox="0 0 143 47"
          fill="none"
          {...props}>
          <G clipPath="url(#clip0_69_43)">
            <Path
              d="M140.973 0L0 4.38l1.278 41.105 140.973-4.38L140.973 0z"
              fill="#98351C"
            />
            <Path
              d="M25.36 32.078h4.396l-7.287-17.39h-3.832l-7.334 17.39h4.42l1.151-2.891h7.358l1.128 2.89zm-7.146-6.299l2.35-5.968 2.328 5.968h-4.678zm14.913-7.99c1.34 0 2.304-.963 2.304-2.303 0-1.339-.964-2.303-2.304-2.303-1.34 0-2.327.964-2.327 2.303 0 1.34.987 2.303 2.327 2.303zm-2.022 14.288h3.997V19.27h-3.997v12.808zm10.859-11.256l-.07-1.551h-3.856v12.808h3.996v-6.58c0-1.669 1.716-2.797 4.161-2.797l.259-3.666c-1.904 0-3.48.658-4.49 1.786zm17.694 1.974c1.34-.823 2.092-2.021 2.092-3.455 0-2.796-2.092-4.652-5.242-4.652H48.54v17.39h7.922c3.785 0 6.3-2.069 6.3-5.17 0-1.904-1.175-3.385-3.103-4.113zm-6.981-4.7h2.891c1.152 0 1.928.658 1.928 1.669 0 1.01-.8 1.668-1.998 1.668h-2.821v-3.337zm3.55 10.575h-3.55v-3.83h3.596c1.317 0 2.233.775 2.233 1.903 0 1.152-.916 1.927-2.28 1.927zm26.11 3.407h4.395l-7.287-17.39h-3.831l-7.334 17.39h4.419l1.152-2.89h7.357l1.129 2.89zM75.19 25.78l2.35-5.97 2.327 5.97h-4.677zm20.887-6.51v7.426c0 1.316-.846 2.185-2.139 2.185-1.316 0-2.163-.869-2.163-2.185V19.27H87.78v8.014c0 3.031 1.904 5.029 4.749 5.029 1.363 0 2.703-.518 3.643-1.575l.07 1.34h3.832V19.27h-3.996zm13.414 9.611c-.87 0-1.481-.681-1.481-1.692v-4.652h3.338V19.27h-3.338v-3.76h-3.996v3.76h-2.045v3.267h2.045v5.498c0 2.562 1.692 4.277 4.184 4.277 1.105 0 2.327-.188 3.338-.634v-3.196c-.682.282-1.364.4-2.045.4zm10.418 3.431c4.161 0 6.982-2.655 6.982-6.65 0-3.971-2.821-6.627-6.982-6.627-4.231 0-7.052 2.655-7.052 6.627 0 3.995 2.821 6.65 7.052 6.65zm-.023-3.43c-1.74 0-2.891-1.293-2.891-3.22 0-1.927 1.151-3.22 2.891-3.22 1.716 0 2.868 1.293 2.868 3.22 0 1.927-1.152 3.22-2.868 3.22z"
              fill="#fff"
            />
          </G>
          <Defs>
            <ClipPath id="clip0_69_43">
              <Path fill="#fff" d="M0 0H143V47H0z" />
            </ClipPath>
          </Defs>
        </Svg>
      </View>
      <View
        style={{
          width: '100%',
          height: 40,
          marginTop: heightPercentageToDP(10),
          paddingHorizontal: 18,
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: '600', fontSize: 24}}>{'Compte'}</Text>
      </View>
      <View
        style={{
          width: '100%',
          height: 361,
          justifyContent: 'center',
        }}>
        <Pressable
          onPress={() => {
            props.navigation.navigate('ListAnnonce');
          }}
          style={{
            width: '100%',
            height: 90,
            flexDirection: 'row',
            alignItems: 'center',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingHorizontal: 18,
          }}>
          <Svg
            width={44}
            height={30}
            viewBox="0 0 44 30"
            fill="none"
            {...props}>
            <Mask
              id="a"
              style={{
                maskType: 'luminance',
              }}
              maskUnits="userSpaceOnUse"
              x={0}
              y={0}
              width={44}
              height={30}>
              <Path
                d="M40 2H4a2 2 0 00-2 2v22a2 2 0 002 2h36a2 2 0 002-2V4a2 2 0 00-2-2z"
                fill="#fff"
                stroke="#fff"
                strokeWidth={4}
                strokeLinejoin="round"
              />
              <Path
                d="M10 11h18m-18 8h8"
                stroke="#000"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Mask>
            <G mask="url(#a)">
              <Path d="M-2-13h48v48H-2v-48z" fill="#0A0A0A" />
            </G>
          </Svg>
          <Text
            style={{fontWeight: '400', paddingHorizontal: 18, fontSize: 17}}>
            {'Annonces'}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            props.navigation.navigate('ListMyReservation');
          }}
          style={{
            width: '100%',
            height: 90,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingHorizontal: 18,
          }}>
          <Svg
            width={40}
            height={28}
            viewBox="0 0 40 28"
            fill="none"
            {...props}>
            <Path
              d="M36.552 0H3.448A3.51 3.51 0 001.01.976 3.278 3.278 0 000 3.333v21.334c0 .884.363 1.732 1.01 2.357A3.51 3.51 0 003.448 28h33.104a3.51 3.51 0 002.438-.976A3.278 3.278 0 0040 24.667V3.333c0-.884-.363-1.732-1.01-2.357A3.51 3.51 0 0036.552 0zm-.69 4v3.333H4.138V4h31.724zM4.138 24V11.333h31.724V24H4.138zm29.655-4c0 .53-.218 1.04-.606 1.414a2.106 2.106 0 01-1.463.586h-5.517c-.549 0-1.075-.21-1.463-.586A1.967 1.967 0 0124.138 20c0-.53.218-1.04.606-1.414A2.106 2.106 0 0126.207 18h5.517c.549 0 1.075.21 1.463.586.388.375.606.884.606 1.414zM22.07 20c0 .53-.218 1.04-.606 1.414A2.106 2.106 0 0120 22h-2.069c-.549 0-1.075-.21-1.463-.586A1.966 1.966 0 0115.862 20c0-.53.218-1.04.606-1.414A2.105 2.105 0 0117.931 18H20c.549 0 1.075.21 1.463.586.388.375.606.884.606 1.414z"
              fill="#0A0A0A"
            />
          </Svg>
          <Text
            style={{fontWeight: '400', paddingHorizontal: 18, fontSize: 17}}>
            {'Réservations'}
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: '100%',
            height: 90,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingHorizontal: 18,
          }}>
          <Svg
            width={25}
            height={25}
            viewBox="0 0 25 25"
            fill="none"
            {...props}>
            <Path
              d="M24.836 22.8c-1.587-2.887-4.065-5.137-7.035-6.387a9.121 9.121 0 003.118-4.576 9.436 9.436 0 00-.051-5.602 9.104 9.104 0 00-3.202-4.514A8.588 8.588 0 0012.523 0a8.588 8.588 0 00-5.144 1.721 9.104 9.104 0 00-3.202 4.514 9.436 9.436 0 00-.051 5.602 9.121 9.121 0 003.119 4.576c-2.97 1.25-5.449 3.5-7.036 6.387a1.473 1.473 0 00-.167 1.11c.045.187.126.363.238.517.112.154.253.283.414.38a1.357 1.357 0 001.076.138c.179-.053.346-.143.49-.264a1.43 1.43 0 00.354-.441c2.097-3.758 5.8-6 9.909-6 4.107 0 7.811 2.243 9.909 6 .19.317.492.545.842.636.35.09.72.037 1.032-.15.312-.187.542-.492.64-.852.1-.36.06-.745-.11-1.074zM6.504 9.122c0-1.234.353-2.44 1.014-3.466a6.07 6.07 0 012.701-2.298 5.822 5.822 0 013.478-.355c1.167.24 2.24.835 3.082 1.707a6.313 6.313 0 011.647 3.195 6.452 6.452 0 01-.343 3.605 6.196 6.196 0 01-2.217 2.8 5.868 5.868 0 01-3.343 1.051 5.92 5.92 0 01-4.254-1.83 6.364 6.364 0 01-1.765-4.409z"
              fill="#0A0A0A"
            />
          </Svg>
          <Text
            style={{fontWeight: '400', paddingHorizontal: 18, fontSize: 17}}>
            {'Profil'}
          </Text>
        </Pressable>
        {/*<View
          style={{
            backgroundColor: 'blue',
            width: '100%',
            height: 90,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 18,
          }}>
          <Text
            style={{fontWeight: '400', paddingHorizontal: 18, fontSize: 17}}>
            {'Paramètres'}
          </Text>
        </View>*/}
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    initApp: state.app.initApp,
    isModalVisible: state.app.isModalVisible,
    isBottomTabBarVisibre: state.app.isBottomTabBarVisibre,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        AppInit,
        updateIsModalVisible,
        updateBottomTabBar,
      },
      dispatch,
    ),
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(User);
