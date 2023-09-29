/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, Pressable, Image, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {bindActionCreators} from 'redux';
import {
  AppInit,
  isConnect,
  updateBottomTabBar,
  updateUserIdConnect,
} from '../../redux/actions/AppActions';
import {HeaderLogin} from '../../lib/components/header/HeaderLogin';
import ApiUrls from '../../network/ApiUrl';
import FlashMessage from '../../lib/FlashMessage';

import DateInfo from '../../lib/components/DateInfo';
import {format} from 'date-fns';
import {useMount} from '../../lib/function/useMount';
import {ScrollView} from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import AddCollectionStyle from '../../ressources/style/AddCollectionStyle';
import ImagePicker from 'react-native-image-crop-picker';

interface ExplorerType {
  navigation;
  route;
  AppInit: Function;
  initApp;
  isBottomTabBarVisibre;
  updateBottomTabBar;
  userId;
  currentLanguage;
  isConnect: Function;
  updateUserIdConnect: Function;
}
type showMessage = {
  message: string;
  duration: number;
};

const AddRental = (props: ExplorerType) => {
  const [titrePublication, setTitrePublication] = useState('');
  const [descriptionPublication, setDescriptionPublication] = useState('');
  const [prix, setPrix] = useState('');
  const [marqueVehicule, setMarqueVehicule] = useState('');
  const [flashMessage, setFlashMessage] = useState<showMessage>();
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [image, setImage] = useState<string>();
  const [image2, setImage2] = useState<string>();
  const [image3, setImage3] = useState<string>();
  const [ville, setVille] = useState<string>();
  const [km, setKm] = useState<string>();
  const [departement, setDepartement] = useState<string>();
  const [selectedCarburant, setSelectedCarburant] = useState('');
  const [user, setUser] = useState();

  console.log(props.userId);

  const updateProductImage = idImage => {
    // Options de configuration de l'image picker

    // Copier la liste des produits pour pouvoir la modifier

    // Lancer l'image picker
    ImagePicker.openPicker({
      mediaType: 'photo',
    }).then(image => {
      console.log(image);
      const formData = new FormData();
      formData.append('file', {
        uri: image.sourceURL,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      formData.append('typeFile', 'Publication');

      fetch(ApiUrls.MEDIA + '/' + props.userId, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.url) {
            if (idImage === 1) {
              setImage(data.url);
            } else if (idImage === 2) {
              setImage2(data.url);
            } else if (idImage === 3) {
              setImage3(data.url);
            }
          }
        })
        .catch(error => console.error(error));
    });
  };

  useMount(() => {
    const currentDate = new Date();
    const minimumBirthDate = new Date();
    minimumBirthDate.setFullYear(currentDate.getFullYear());

    setDate(minimumBirthDate);
  });

  const hideFlashMessage = () => {
    setFlashMessage(undefined);
  };
  useEffect(() => {
    const getUset = async () => {
      const userResponse = await fetch(ApiUrls.GET_USER + '/' + props.userId);
      const userData = await userResponse.json();
      console.log(userData);
      setUser(userData);
    };

    getUset();
  }, []);
  const addPost = async () => {
    // Vérification des valeurs saisies
    if (
      !titrePublication ||
      !descriptionPublication ||
      !image ||
      !prix ||
      !marqueVehicule ||
      !selectedCarburant ||
      !km ||
      !departement ||
      !ville ||
      !date
    ) {
      console.log('Tous les champs doivent être saisis');
      return;
    }

    const data = JSON.stringify({
      Titre_Publication: titrePublication,
      Description_Publication: descriptionPublication,
      img_Publication1: image,
      img_Publication2: image2,
      img_Publication3: image3,
      Prix: prix,
      Marque_Vehicule: marqueVehicule,
      Carburant: selectedCarburant,
      kilometre: km,
      departement: departement,
      Ville: ville,
      Date_Immatriculation: format(date, 'dd-MM-yyyy'),
      ID_Type_Publication: 2,
      Date_Publication: new Date(),
      Etat_Publication: 'valider',
    });

    try {
      const response = await fetch(ApiUrls.POST_ANNONCE + '/' + props.userId, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log(result);
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  const renderItem = ({item}) => {
    const isSelected = selectedCarburant === item;

    return (
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: '#98351C',
          backgroundColor: isSelected ? '#98351C' : 'transparent',
          padding: 10,
          margin: 5,
          borderRadius: 5,
        }}
        onPress={() => setSelectedCarburant(item)}>
        <Text style={{color: isSelected ? 'white' : '#98351C'}}>{item}</Text>
      </TouchableOpacity>
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
      <HeaderLogin navigation={props.navigation} />
      {!!flashMessage && (
        <FlashMessage
          message={flashMessage.message}
          duration={3000}
          onHide={hideFlashMessage}
        />
      )}
      <View
        style={[
          {
            alignItems: 'center',
            marginTop: 70,
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[
            {
              backgroundColor: '#E1E1E1',
              width: widthPercentageToDP(85),
              height: heightPercentageToDP(100),
              marginTop: '15%',
            },
          ]}>
          <View
            style={[
              {
                backgroundColor: '#E1E1E1',
                width: '100%',
              },
            ]}>
            <Text>{'Titre'}</Text>

            <TextInput
              placeholder="Titre"
              onChangeText={text => setTitrePublication(text)}
              value={titrePublication}
              placeholderTextColor={'grey'}
              autoCapitalize="none"
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 4,
                width: '100%',
                height: 50,
                paddingHorizontal: 8,
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text>{'Description'}</Text>

            <TextInput
              placeholder="Description"
              onChangeText={text => setDescriptionPublication(text)}
              placeholderTextColor={'grey'}
              value={descriptionPublication}
              multiline={true}
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 4,
                width: '100%',
                height: 150,
                paddingHorizontal: 8,
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text>{'Marque'}</Text>

            <TextInput
              placeholder="Marque"
              onChangeText={text => setMarqueVehicule(text)}
              placeholderTextColor={'grey'}
              value={marqueVehicule}
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 4,
                width: '100%',
                height: 50,
                paddingHorizontal: 8,
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text>{'Ville'}</Text>

            <TextInput
              placeholder="Ville"
              onChangeText={text => setVille(text)}
              placeholderTextColor={'grey'}
              value={ville}
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 4,
                width: '100%',
                height: 50,
                paddingHorizontal: 8,
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text>{'Département'}</Text>

            <TextInput
              placeholder="Département"
              onChangeText={text => setDepartement(text)}
              placeholderTextColor={'grey'}
              value={departement}
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 4,
                width: '100%',
                height: 50,
                paddingHorizontal: 8,
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text>{'kilomètre'}</Text>

            <TextInput
              placeholder="kilomètre"
              onChangeText={text => setKm(text)}
              placeholderTextColor={'grey'}
              value={km}
              keyboardType="numeric"
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 4,
                width: '100%',
                height: 50,
                paddingHorizontal: 8,
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Text>{'Carburant'}</Text>

            <View
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 4,
                width: '100%',
                height: 50,
                paddingHorizontal: 8,
              }}>
              <FlatList
                data={['Diesel', 'Essence', 'Electrique']} // Données à afficher
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                extraData={selectedCarburant}
                horizontal
              />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text>{'Prix'}</Text>

            <TextInput
              placeholder="Prix"
              onChangeText={text => setPrix(text)}
              placeholderTextColor={'grey'}
              value={prix}
              keyboardType="numeric"
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 4,
                width: '100%',
                height: 50,
                paddingHorizontal: 8,
              }}
            />
          </View>

          <View style={{marginTop: 20}}>
            <Text>{'Date Immatriculation'}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  borderColor: 'grey',
                  borderWidth: 1,
                  borderRadius: 4,
                  width: '90%',
                  height: 50,
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                }}>
                <Text>{format(date, 'dd-MM-yyyy')}</Text>
              </View>
              <Pressable
                style={{height: 24, width: 24, marginLeft: 5}}
                onPress={() => setShowModal(true)}>
                <Svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  {...props}>
                  <Path
                    stroke="#232323"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </Svg>
              </Pressable>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View style={[AddCollectionStyle.labelInput]}>
              <View>
                <Text style={AddCollectionStyle.label}>{'Image 1'}</Text>
                <Pressable
                  style={AddCollectionStyle.pressableAddPicture}
                  onPress={() => {
                    updateProductImage(1);
                  }}>
                  {image ? (
                    <Image
                      style={AddCollectionStyle.picture}
                      source={{uri: image}}
                    />
                  ) : (
                    <View style={AddCollectionStyle.svgAddPicture}>
                      <Svg
                        width={24}
                        height={24}
                        viewBox="0 0 32 32"
                        fill="none">
                        <Path
                          d="M16 5.333v21.334M26.668 16H5.334"
                          stroke="#121212"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    </View>
                  )}
                </Pressable>
              </View>
              <View>
                <Text style={AddCollectionStyle.label}>{'Image 2'}</Text>
                <Pressable
                  style={AddCollectionStyle.pressableAddPicture}
                  onPress={() => {
                    updateProductImage(2);
                  }}>
                  {image ? (
                    <Image
                      style={AddCollectionStyle.picture}
                      source={{uri: image2}}
                    />
                  ) : (
                    <View style={AddCollectionStyle.svgAddPicture}>
                      <Svg
                        width={24}
                        height={24}
                        viewBox="0 0 32 32"
                        fill="none">
                        <Path
                          d="M16 5.333v21.334M26.668 16H5.334"
                          stroke="#121212"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    </View>
                  )}
                </Pressable>
              </View>
              <View>
                <Text style={AddCollectionStyle.label}>{'Image 3'}</Text>
                <Pressable
                  style={AddCollectionStyle.pressableAddPicture}
                  onPress={() => {
                    updateProductImage(3);
                  }}>
                  {image ? (
                    <Image
                      style={AddCollectionStyle.picture}
                      source={{uri: image3}}
                    />
                  ) : (
                    <View style={AddCollectionStyle.svgAddPicture}>
                      <Svg
                        width={24}
                        height={24}
                        viewBox="0 0 32 32"
                        fill="none">
                        <Path
                          d="M16 5.333v21.334M26.668 16H5.334"
                          stroke="#121212"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    </View>
                  )}
                </Pressable>
              </View>
            </View>
            <Pressable
              style={{
                backgroundColor: '#98351C',
                width: 116,
                height: 44,
                alignSelf: 'center',
                marginTop: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                addPost();
              }}>
              <Text
                style={{
                  fontFamily: 'Bw Modelica',
                  fontSize: 12,
                  fontWeight: '800',
                  color: 'white',
                }}>
                {'Ajouter'}
              </Text>
            </Pressable>
          </View>
          <View style={{marginTop: 20, height: 200, width: 100}} />
        </ScrollView>
      </View>
      <DateInfo
        currentLanguage={props.currentLanguage}
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        sale={true}
        setInfo={setDate}
        date={date}
      />
    </View>
  );
};

function mapStateToProps(state) {
  return {
    initApp: state.app.initApp,
    isBottomTabBarVisibre: state.app.isBottomTabBarVisibre,
    currentLanguage: state.app.currentLanguage,
    userId: state.app.userId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        AppInit,
        updateBottomTabBar,
        isConnect,
        updateUserIdConnect,
      },
      dispatch,
    ),
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(AddRental);
