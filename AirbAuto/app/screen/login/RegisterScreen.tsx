/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, TextInput, View, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {getLangValue} from '../../ressources/Languages/Language';
import strings from '../../ressources/strings';
import DateInfo from '../../lib/components/DateInfo';
import {format} from 'date-fns';
import {useMount} from '../../lib/function/useMount';
import {ScrollView} from 'react-native-gesture-handler';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

interface ExplorerType {
  navigation;
  route;
  AppInit: Function;
  initApp;
  isBottomTabBarVisibre;
  updateBottomTabBar;
  currentLanguage;
  isConnect: Function;
  updateUserIdConnect: Function;
}
type showMessage = {
  message: string;
  duration: number;
};

const RegisterScreen = (props: ExplorerType) => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [flashMessage, setFlashMessage] = useState<showMessage>();
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState<boolean>(false);

  const doRegister = async () => {
    const data = JSON.stringify({
      email: email,
      password: password,
      pseudo: 'test',
      prenom: prenom,
      nom: nom,
      numeroPortable: numero,
      date_naissance: date,
      img_profil: '',
    });

    await fetch(ApiUrls.REGISTER, {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result?.status != 500) {
          AsyncStorage.setItem('isConnected', 'true');
          AsyncStorage.setItem('token_User', result.user.idToken);
          AsyncStorage.setItem('UserCred', data);
          props.updateUserIdConnect(result.user.uid);
          props.isConnect(true);
          props.navigation.navigate('Home', {from: 'Login'});
        } else {
          setFlashMessage({
            message: getLangValue(
              strings.IDENTIFIANT_NOT_CORRECT,
              props.currentLanguage,
            ),
            duration: 3000,
          });
        }
      })
      .catch(error => console.log(error));
  };
  const handleLogin = () => {
    // Vérifier les informations d'identification ici (par exemple, envoyer une requête au serveur)
    doRegister();
    /*if (email === 'exemple@email.com' && password === 'motdepasse') {
      Alert.alert('Connexion réussie');
    } else {
      Alert.alert('Identifiants invalides');
    }*/
  };
  useMount(() => {
    const currentDate = new Date();
    const minimumBirthDate = new Date();
    minimumBirthDate.setFullYear(currentDate.getFullYear() - 18);

    setDate(minimumBirthDate);
  });

  const hideFlashMessage = () => {
    setFlashMessage(undefined);
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
            <Text>{'Prénom'}</Text>

            <TextInput
              placeholder="Prénom"
              onChangeText={text => setPrenom(text)}
              value={prenom}
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
            <Text>{'Nom de famille'}</Text>

            <TextInput
              placeholder="Nom de famille"
              onChangeText={text => setNom(text)}
              placeholderTextColor={'grey'}
              value={nom}
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
            <Text>{'Pseudo'}</Text>

            <TextInput
              placeholder="Pseudo"
              onChangeText={text => setPseudo(text)}
              placeholderTextColor={'grey'}
              value={pseudo}
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
            <Text>{'Date de naissance'}</Text>
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
            <Text>{'Adresse mail'}</Text>

            <TextInput
              placeholder="Adresse mail"
              onChangeText={text => setEmail(text)}
              value={email}
              placeholderTextColor={'grey'}
              keyboardType="email-address"
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
            <Text>{'Numéro'}</Text>

            <TextInput
              placeholder="Numéro"
              onChangeText={text => setNumero(text)}
              value={numero}
              placeholderTextColor={'grey'}
              keyboardType="numeric"
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
            <Text>{'Mot de passe'}</Text>

            <TextInput
              placeholder="Mot de passe"
              onChangeText={text => setPassword(text)}
              placeholderTextColor={'grey'}
              value={password}
              secureTextEntry
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 4,
                width: '100%',
                height: 50,
                paddingHorizontal: 8,
              }}
            />
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
                handleLogin();
              }}>
              <Text
                style={{
                  fontFamily: 'Bw Modelica',
                  fontSize: 12,
                  fontWeight: '800',
                  color: 'white',
                }}>
                {'Connexion'}
              </Text>
            </Pressable>
          </View>
          <View style={{marginTop: 20, height: 40, width: 30}} />
        </ScrollView>
      </View>
      <DateInfo
        currentLanguage={props.currentLanguage}
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
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
export default connector(RegisterScreen);
