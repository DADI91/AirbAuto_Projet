import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const AddModalStyle = StyleSheet.create({
  TouchableOpacityBack: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  viewStartLive: {
    height: widthPercentageToDP(6),
    marginLeft: widthPercentageToDP(4.26),
  },

  modalView: {
    backgroundColor: '#EDEDED',
    borderRadius: 8,
    shadowColor: '#000000',
    height: heightPercentageToDP(15.61),
    width: widthPercentageToDP(87.2),
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  positionModal: {
    position: 'absolute',
    bottom: heightPercentageToDP(11.42),
  },

  bouttonAdd: {
    height: heightPercentageToDP(6.89),
    width: widthPercentageToDP(87.2),
    backgroundColor: '#FFFFFF',
  },
  viewbouttonLive: {
    height: heightPercentageToDP(6.89),
    width: widthPercentageToDP(87.2),
  },

  viewTextChoice: {
    height: widthPercentageToDP(6),
    marginLeft: widthPercentageToDP(4.26),
  },

  modalView2: {
    margin: heightPercentageToDP(0.98),
    backgroundColor: '#EDEDED',
    shadowColor: '#000000',
    height: heightPercentageToDP(6.89),
    width: widthPercentageToDP(87.2),
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderRadius: 8,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textChoice: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
  },

  title: {
    //fontFamily: fonts.POPPINS_MEDIUM_IOS,
    fontSize: 16,
    color: '#24242460',
    textAlign: 'center',
  },

  boutton: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1,
    borderColor: '#24242410',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  boutton2: {
    borderWidth: 1,
    borderColor: '#24242410',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  bouttonLive: {
    backgroundColor: 'white',

    borderRadius: 8,
    borderColor: '#EDEDED',
    borderWidth: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  margingLeftWp4: {
    marginLeft: widthPercentageToDP(4.26),
  },
  modalViewLive: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },

  modalViewVideo: {
    height: heightPercentageToDP(6.89),
    width: widthPercentageToDP(87.2),
    backgroundColor: '#FFFFFF',
  },

  viewTextAdd: {
    height: heightPercentageToDP(4.9261),
    width: widthPercentageToDP(87.2),
    justifyContent: 'center',
  },
});

export default AddModalStyle;
