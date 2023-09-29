/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, Image, Pressable} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Svg, {Circle, ClipPath, Defs, G, Path} from 'react-native-svg';
import {bindActionCreators} from 'redux';
import {
  AppInit,
  updateBottomTabBar,
  isConnect,
  updateIsModalVisible,
  updateUserIdConnect,
} from '../../redux/actions/AppActions';
import {ScrollView} from 'react-native-gesture-handler';
import ApiUrls from '../../network/ApiUrl';

interface ExplorerType {
  navigation;
  route;
  AppInit: Function;
  initApp;
  isBottomTabBarVisibre;
  updateBottomTabBar;
  updateIsModalVisible;
  isModalVisible;
  connects;
  userId;
  updateUserIdConnect;
  isConnect;
  isConnected;
}
type showMessage = {
  message: string;
  duration: number;
};

const DetailPost = (props: ExplorerType) => {
  const [connect, setConnect] = useState(false);
  const [displayNum, setDisplayNum] = useState(false);
  const [user, setUser] = useState(false);

  setDisplayNum;
  //AsyncStorage.clear();
  const {publication} = props.route.params;

  useEffect(() => {
    //getPost();
    getUser();

    props.updateBottomTabBar(true);
  }, [publication.Id_User]);

  const getUser = async () => {
    console.log(ApiUrls.GET_USER + '/' + publication.Id_User);
    await fetch(ApiUrls.GET_USER + '/' + publication.Id_User, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setUser(result.user); // Mettre à jour l'état des publications
      })
      .catch(error => console.log(error));
  };
  /*const getPost = async () => {
    await fetch(ApiUrls.POST_ANNONCE, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setPublications(result.publications); // Mettre à jour l'état des publications
      })
      .catch(error => console.log(error));
  };*/

  return (
    <View
      style={[
        {
          backgroundColor: '#E1E1E1',
          display: 'flex',
          alignItems: 'center',
          borderStyle: 'solid',
          height: '100%',
          width: '100%',
        },
      ]}>
      <View
        style={[
          {
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 70,
            height: widthPercentageToDP(90),
            width: '100%',
          },
        ]}>
        <Image
          source={{uri: publication.img_Publication1}}
          style={{
            height: '100%',
            width: '100%',
          }}
        />

        <Pressable
          onPress={() => {
            props.navigation.goBack();
          }}
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
          }}>
          <Svg
            width={25}
            height={25}
            viewBox="0 0 25 25"
            fill="none"
            {...props}>
            <Circle cx={12.5} cy={12.5} r={12.5} fill="#fff" />
            <Path
              d="M17.29 16.279a.715.715 0 11-1.012 1.012L12.5 13.51 8.721 17.29a.715.715 0 11-1.011-1.011l3.779-3.778L7.71 8.722A.715.715 0 118.722 7.71L12.5 11.49l3.779-3.78a.715.715 0 111.012 1.012l-3.78 3.78 3.778 3.778z"
              fill="#0A0A0A"
            />
          </Svg>
        </Pressable>
      </View>

      <ScrollView
        style={{
          height: 200,
          width: '100%',
        }}>
        <View
          style={{
            height: 80,
            width: '100%',
          }}>
          <Text
            style={{
              width: '100%',
              fontWeight: '600',
              fontSize: 18,
              marginLeft: 12,
            }}>
            {publication.Titre_Publication}
          </Text>
          <Text
            style={{
              width: '100%',
              fontSize: 14,
              marginLeft: 12,
              marginTop: 5,
              color: 'grey',
            }}>
            {`${publication.Ville} - ${publication.Carburant} - ${publication.kilometre} Km - ${publication.Departement} `}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              top: 0,
              right: 10,
              height: 30,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                marginLeft: 12,
                marginTop: 3,
              }}>
              {publication.Note_Publication === ''
                ? 'New '
                : publication.Note_Publication}
            </Text>
            <Svg
              width={13}
              height={13}
              viewBox="0 0 11 11"
              fill="none"
              {...props}>
              <Path
                d="M5.5 8.893l-2.582 1.959a.612.612 0 01-.418.147.731.731 0 01-.402-.13.797.797 0 01-.27-.33.578.578 0 01-.009-.45l.995-3.207-2.53-1.785a.586.586 0 01-.262-.365.717.717 0 01.018-.416.804.804 0 01.244-.338.624.624 0 01.419-.147h3.122L4.837.503a.755.755 0 01.27-.373.66.66 0 01.786 0 .751.751 0 01.27.373L7.175 3.83h3.122c.163 0 .303.05.419.148a.717.717 0 01.262.754.586.586 0 01-.262.364l-2.53 1.785.995 3.207a.576.576 0 01-.009.45.795.795 0 01-.27.33.74.74 0 01-.402.13.608.608 0 01-.418-.147L5.5 8.892z"
                fill="#EFFF39"
              />
            </Svg>
          </View>
        </View>
        {props.userId !== publication.Id_User && (
          <View
            style={{
              height: 80,
              width: '100%',
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                backgroundColor: '#98351C',
                width: widthPercentageToDP(60),
                height: 35,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                console.log(props.isConnected);
                if (props.isConnected) {
                  if (publication.ID_Type_Publication === 1) {
                    setDisplayNum(true);
                  } else {
                    props.navigation.navigate('NewReserv', {
                      idPost: publication.ID_Publication,
                    });
                  }
                } else {
                  props.navigation.navigate('Login');
                }
              }}>
              <Text
                style={{
                  fontFamily: 'Bw Modelica',
                  fontSize: 12,
                  fontWeight: '800',
                  color: 'white',
                }}>
                {publication.ID_Type_Publication === 2
                  ? 'Reserver'
                  : displayNum
                  ? user.numeroPortable
                  : 'Contacter'}
              </Text>
            </Pressable>
          </View>
        )}
        <View
          style={{
            width: '100%',
          }}>
          <Text
            style={{
              width: '100%',
              fontWeight: '600',
              fontSize: 18,
              marginLeft: 12,
            }}>
            {'Description'}
          </Text>
          <Text
            numberOfLines={0}
            style={{
              marginTop: 10,
              width: '90%',
              fontSize: 16,
              marginLeft: 16,
            }}>
            {publication.Description_Publication}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 8,
            marginTop: 20,
          }}>
          <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            {...props}>
            <Path
              d="M12 9v4m0 3v.01M3 12a9 9 0 1018.001 0A9 9 0 003 12z"
              stroke="#D61D1D"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          <Text
            style={{
              width: '90%',
              fontSize: 16,
              marginLeft: 16,
              color: '#D61D1D',
            }}>
            {'Signaler l’annonce'}
          </Text>
        </View>
        <View style={{height: 50, width: '100%'}} />
      </ScrollView>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    initApp: state.app.initApp,
    isBottomTabBarVisibre: state.app.isBottomTabBarVisibre,
    connects: state.app.connect,
    isModalVisible: state.app.isModalVisible,
    userId: state.app.userId,
    isConnected: state.app.connect,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        AppInit,
        updateBottomTabBar,
        updateIsModalVisible,
        updateUserIdConnect,
        isConnect,
      },
      dispatch,
    ),
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(DetailPost);
