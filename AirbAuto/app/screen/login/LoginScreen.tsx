/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, TextInput, View, Pressable, Alert} from 'react-native';
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

const LoginScreen = (props: ExplorerType) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flashMessage, setFlashMessage] = useState<showMessage>();

  const doLogin = async (email, password) => {
    const data = JSON.stringify({
      email: email,
      password: password,
    });

    await fetch(ApiUrls.LOGIN, {
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
          props.updateUserIdConnect(result.user.localId);

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
    doLogin(email, password);
    /*if (email === 'exemple@email.com' && password === 'motdepasse') {
      Alert.alert('Connexion réussie');
    } else {
      Alert.alert('Identifiants invalides');
    }*/
  };

  const handleRegister = () => {
    // Naviguer vers la page d'inscription
    props.navigation.navigate('Register');
  };
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
            marginTop: 151,
            height: 542,
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
        <View
          style={[
            {
              backgroundColor: 'E1E1E1',
              width: '100%',
              marginTop: '50%',
            },
          ]}>
          <View
            style={[
              {
                backgroundColor: 'E1E1E1',
                width: '100%',
              },
            ]}>
            <Text style={{color: '#98351C'}}>{'Adresse mail'}</Text>

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

            <Pressable
              onPress={handleRegister}
              style={{marginTop: 20, alignSelf: 'center'}}>
              <Text style={{fontWeight: 'bold', color: '#98351C'}}>
                {'Créer votre compte dès maintenant'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
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
        updateUserIdConnect,
        updateBottomTabBar,
        isConnect,
      },
      dispatch,
    ),
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(LoginScreen);
