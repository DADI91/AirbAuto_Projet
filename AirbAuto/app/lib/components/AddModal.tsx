/* eslint-disable @typescript-eslint/no-explicit-any */
// Challenges Screen

import React from 'react';
import {Text, View, TouchableOpacity, Modal} from 'react-native';

import {CompositeNavigationProp} from '@react-navigation/native';

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {updatePage} from '../../redux/actions/AppActions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import strings from '../../ressources/strings';
import {getLangValue} from '../../ressources/Languages/Language';
import AddModalStyle from '../../ressources/style/AddModalStyle';

interface modalADD {
  active: boolean;
  text: string;
  onQuitPressed: (bool: boolean) => void;
  navigation: CompositeNavigationProp<any, any>;
}

const AddModal = props => {
  return (
    <Modal
      animationType="slide"
      //propagateSwipe={true}
      visible={props.active}
      transparent={true}>
      <View>
        <TouchableOpacity
          style={AddModalStyle.TouchableOpacityBack}
          onPressIn={props.onQuitPressed}>
          <View style={AddModalStyle.positionModal}>
            <View style={AddModalStyle.modalView}>
              <View>
                <View style={AddModalStyle.viewTextAdd}>
                  <Text allowFontScaling={false} style={AddModalStyle.title}>
                    {'Nouvelle Annonce'}
                  </Text>
                </View>

                <View style={AddModalStyle.bouttonAdd}>
                  <TouchableOpacity
                    onPress={() => {
                      props.updatePage(3);
                      props.onQuitPressed();
                      props.navigation.navigate('AddVente');
                    }}>
                    <View style={AddModalStyle.boutton2}>
                      <View style={AddModalStyle.margingLeftWp4}>
                        <Svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          height={24}
                          width={24}
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                          {...props}>
                          <Path
                            stroke="#242424"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
                        </Svg>
                      </View>
                      <View style={AddModalStyle.viewTextChoice}>
                        <Text
                          allowFontScaling={false}
                          style={AddModalStyle.textChoice}>
                          {'Vente'}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={[
                    AddModalStyle.bouttonAdd,
                    {
                      borderBottomLeftRadius: 8,
                      borderBottomRightRadius: 8,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      props.updatePage(4);
                      props.onQuitPressed();
                      props.navigation.navigate('AddLocation');
                    }}>
                    <View style={AddModalStyle.boutton}>
                      <View style={AddModalStyle.margingLeftWp4}>
                        <Svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          height={24}
                          width={24}
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                          {...props}>
                          <Path
                            stroke="#242424"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                          />
                        </Svg>
                      </View>
                      <View style={AddModalStyle.viewTextChoice}>
                        <Text
                          allowFontScaling={false}
                          style={AddModalStyle.textChoice}>
                          {'Location'}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {
    pageAddContent: state.app.pageAddContent,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        updatePage,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);
