/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, Image, Pressable} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {bindActionCreators} from 'redux';
import StarRating from 'react-native-star-rating';

import {
  AppInit,
  updateBottomTabBar,
  isConnect,
  updateIsModalVisible,
  updateUserIdConnect,
} from '../../redux/actions/AppActions';
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

type postInfo = {
  index: any;
  post: any;
};
const ListMyReservation = (props: ExplorerType) => {
  const [displayNum, setDisplayNum] = useState(false);
  const [user, setUser] = useState<Array<any>>([]);
  const [reservations, setReservations] = useState([]);
  const [post, setPost] = useState<Array<any>>([]);
  const [note, setNote] = useState(0);

  const [refraiche1, setRefraiche] = useState<boolean>(false); // État pour stocker les publications
  useEffect(() => {
    const fetchData = async () => {
      const users = {};
      const posts = {};

      for (const reservation of reservations) {
        const postId = reservation.id_Publication;

        if (!posts[postId]) {
          const postResponse = await fetch(
            ApiUrls.GET_ANNONCE_ID + '/' + postId,
          );
          const postData = await postResponse.json();
          posts[postId] = postData.publication;
          const userId = postData.publication.Id_User;

          if (!users[userId]) {
            const userResponse = await fetch(ApiUrls.GET_USER + '/' + userId);
            const userData = await userResponse.json();
            users[postId] = userData.user;
          }
        }
      }
      setUser(prevUserData => ({...prevUserData, ...users}));
      setPost(prevPostData => ({...prevPostData, ...posts}));
    };

    fetchData();
  }, [reservations]);

  useEffect(() => {
    getReservation();
  }, []);
  const getReservation = async () => {
    await fetch(ApiUrls.NEW_RESERVATION + '/user/' + props.userId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        setReservations(result.reservations);
      })
      .catch(error => console.log(error));
  };

  const onRefraiche = () => {
    getReservation();
    setRefraiche(false);
  };
  const addNote = async (idPost, idReservation) => {
    // Vérification des valeurs saisies
    if (note == 0) {
      console.log('Tous les champs doivent être saisis');
      return;
    }

    const data = JSON.stringify({
      Note_Publication: note.toString(),
    });
    console.log(
      ApiUrls.UPDATE_NOTE +
        '/' +
        props.userId +
        '/' +
        idPost +
        '/' +
        idReservation,
    );
    try {
      const response = await fetch(
        ApiUrls.UPDATE_NOTE +
          '/' +
          props.userId +
          '/' +
          idPost +
          '/' +
          idReservation,
        {
          method: 'PUT',
          body: data,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      const result = await response.json();
      console.log(result);
      //props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const renderItemStar = (item, index) => {
    return (
      <Pressable
        onPress={() => {
          console.log(item);
          setNote(item);
        }}
        style={{height: 30, width: 30}}>
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          {...props}>
          <Path
            stroke="#F2FF00"
            fill={note >= item ? '#F2FF00' : 'none'}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </Svg>
      </Pressable>
    );
  };

  const renderItem = (item, index) => {
    const userItem = user[item.id_Publication] || {};
    const postItem = post[item.id_Publication] || {};

    const deleteReservation = async () => {
      await fetch(
        ApiUrls.NEW_RESERVATION +
          '/' +
          props.userId +
          '/' +
          item.ID_Reservation,
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
          getReservation();
        })
        .catch(error => console.log(error));
    };
    console.log(item.Note);
    return (
      <View
        style={{
          height: 89,
          width: '98%',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#24242430',
          alignSelf: 'center',
          flexDirection: 'row',
          borderRadius: 5,
          marginVertical: 5,
          padding: 4,
        }}>
        {!!postItem.img_Publication1 && (
          <Image
            source={{uri: postItem.img_Publication1}}
            style={{height: 89, width: 100}}
          />
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: widthPercentageToDP(75),
            marginRight: 15,
          }}>
          <View
            style={{
              height: '100%',
              marginLeft: 5,
            }}>
            <Text style={{fontWeight: '700', fontSize: 14}}>
              {postItem?.Marque_Vehicule}
            </Text>
            <Text style={{fontSize: 14, color: 'grey'}}>{postItem?.Ville}</Text>
          </View>

          {item.statut_reservation == 'En cours' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: 20,
                width: widthPercentageToDP(40),
              }}>
              <Pressable
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
                  {item.statut_reservation}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  deleteReservation();
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
                    color: 'red',
                  }}>
                  {'Annuler'}
                </Text>
              </Pressable>
            </View>
          ) : item.statut_reservation == 'Valider' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: widthPercentageToDP(50),
              }}>
              <Pressable
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
                  {item.statut_reservation}
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: '#98351C',
                  width: widthPercentageToDP(30),
                  height: 35,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setDisplayNum(!displayNum);
                  console.log(userItem[index]);
                }}>
                <Text
                  style={{
                    fontFamily: 'Bw Modelica',
                    fontSize: 12,
                    fontWeight: '800',
                    color: 'white',
                  }}>
                  {displayNum ? userItem.numeroPortable : 'Contacter'}
                </Text>
              </Pressable>
            </View>
          ) : item.statut_reservation == 'Refuser' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: 20,
                width: widthPercentageToDP(40),
              }}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  height: 50,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                  }}>
                  {'Réservation a été refuser'}
                </Text>
              </Pressable>
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                width: widthPercentageToDP(50),
              }}>
              {(item.statut_reservation == 'Terminer' && !item.Note) && (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '70%',
                    height: 30,
                    justifyContent: 'space-between',
                  }}>
                  <FlatList
                    data={[1, 2, 3, 4, 5]}
                    horizontal
                    scrollEnabled={false}
                    renderItem={({item, index}) => renderItemStar(item, index)}
                  />
                </View>
              )}
              {item.statut_reservation == 'Terminer' && !item.Note ? (
                <Pressable
                  onPress={() => {
                    addNote(item.id_Publication, item.ID_Reservation);
                  }}
                  style={{
                    backgroundColor: '#98351C',
                    width: widthPercentageToDP(30),
                    height: 35,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 5,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Bw Modelica',
                      fontSize: 12,
                      fontWeight: '800',
                      color: 'white',
                    }}>
                    {'Noter'}
                  </Text>
                </Pressable>
              ) : (
                <Pressable
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
                    {item.statut_reservation}
                  </Text>
                </Pressable>
              )}
            </View>
          )}
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
          {'Mes réservation'}
        </Text>
        <FlatList
          data={reservations} // Données à afficher
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
export default connector(ListMyReservation);
