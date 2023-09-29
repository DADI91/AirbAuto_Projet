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
}
type showMessage = {
  message: string;
  duration: number;
};

const ListAnnonce = (props: ExplorerType) => {
  const [displayNum, setDisplayNum] = useState(false);
  const [user, setUser] = useState(false);
  const [publication, setPublications] = useState([]);
  const [refraiche1, setRefraiche] = useState<boolean>(false); // État pour stocker les publications
  useEffect(() => {
    getPost();
  }, []);
  const getPost = async () => {
    await fetch(ApiUrls.GET_ANNONCE_USER + '/' + props.userId, {
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
  };

  const onRefraiche = () => {
    getPost();
    setRefraiche(false);
  };
  const renderItem = (item, index) => {
    const publicationDate: any = new Date(item.Date_Publication);

    // Calcul de la différence entre la date actuelle et la date de publication
    const currentDate: any = new Date();
    const timeDifference = currentDate - publicationDate;

    // Conversion de la différence en millisecondes en heures et jours
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const deletePost = async () => {
      await fetch(
        ApiUrls.POST_ANNONCE + '/' + props.userId + '/' + item.ID_Publication,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
        .then(response => response.json())
        .then(result => {
          setTimeout(() => {
            getPost();
          }, 500);
        })
        .catch(error => console.log(error));
    };
    // Création du texte à afficher
    let timeAgoText = '';
    if (hoursDifference < 24) {
      timeAgoText = `il y a ${hoursDifference}h`;
    } else {
      timeAgoText = `il y a ${daysDifference} jour${
        daysDifference > 1 ? 's' : ''
      }`;
    }

    return (
      <View
        style={{
          height: 85,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
        }}>
        <Image
          source={{uri: item.img_Publication1}}
          style={{height: 85, width: 85}}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            width: widthPercentageToDP(75),
            marginRight: 15,
          }}>
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
            }}>
            <Text style={{fontWeight: '700', fontSize: 14}}>
              {item.Marque_Vehicule}
            </Text>
            <Text style={{fontSize: 14, color: 'grey'}}>{item.Ville}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: widthPercentageToDP(40),
              height: '100%',
              marginRight: 15,
            }}>
            <Pressable
              onPress={() => {
                props.navigation.navigate('ListReservation', {
                  publication: item,
                });
              }}
              style={{
                flexDirection: 'row',
                height: 50,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  textDecorationLine: 'underline',
                }}>
                {'Réservations'}
              </Text>
            </Pressable>
            <View
              style={{
                height: '100%',
                width: 25,
                justifyContent: 'space-between',
              }}>
              <Pressable
                onPress={() => {
                  props.navigation.navigate('UpdatePost', {publication: item});
                }}
                style={{
                  flexDirection: 'row',
                  height: 20,
                  alignItems: 'center',
                }}>
                <Svg
                  fill="none"
                  viewBox="0 0 20 20"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  {...props}>
                  <Path
                    stroke="#242424"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </Svg>
              </Pressable>
              <Pressable
                onPress={() => {
                  deletePost();
                }}
                style={{
                  flexDirection: 'row',
                  height: 20,
                  alignItems: 'center',
                }}>
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  {...props}>
                  <Path
                    stroke="red"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </Svg>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  };

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
            marginTop: 60,
            width: '100%',
          },
        ]}>
        <View
          style={[
            {
              alignItems: 'center',
              width: '100%',
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
            width={17}
            height={30}
            viewBox="0 0 17 30"
            fill="none"
            {...props}>
            <Path
              d="M15.928 29.072L1.89 15.036 15.928 1"
              stroke="#0A0A0A"
              strokeWidth={2}
            />
          </Svg>
        </Pressable>
      </View>

      <View style={{height: '100%', width: '100%', marginTop: 30}}>
        <Text style={{fontSize: 23, fontWeight: '600', marginLeft: 8}}>
          {'Annonces'}
        </Text>
        <FlatList
          data={publication} // Données à afficher
          keyExtractor={(item, index) => index.toString()} // Fonction pour générer des clés uniques
          renderItem={({item, index}) => renderItem(item, index)}
          onRefresh={() => {
            setRefraiche(true);
            onRefraiche();
          }}
          refreshing={refraiche1}
        />
      </View>
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
export default connector(ListAnnonce);
