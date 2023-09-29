import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AddCollectionStyle = StyleSheet.create({
  loginPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: hp('65%'),
    fontFamily: 'Jost-Regular',
    color: 'black',
  },

  pressableAddPicture: {
    height: widthPercentageToDP(25.48),
    width: widthPercentageToDP(25.48),
    borderRadius: 10,
    borderColor: '#00000030',
    borderWidth: 1,
  },

  picture: {
    height: widthPercentageToDP(25.48),
    width: widthPercentageToDP(25.48),
    borderRadius: 9,
  },

  svgAddPicture: {
    height: widthPercentageToDP(25.48),
    width: widthPercentageToDP(25.48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  toggleBorder: {
    height: 22,
    width: 40,
    borderColor: '#00000030',
    borderWidth: 1,
    borderRadius: 24,
    justifyContent: 'center',
    backgroundColor: '#00000030',
  },

  toggleBorder2: {
    height: 22,
    width: 40,
    borderColor: '#00000030',
    borderWidth: 1,
    borderRadius: 24,
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },

  elementBorder: {
    position: 'absolute',
    height: 16,
    width: 16,
    borderRadius: 24,
    left: 20,
    backgroundColor: '#F6F6F6',
  },

  elementBorder2: {
    position: 'absolute',
    height: 16,
    width: 16,
    borderRadius: 24,
    left: 2,
    backgroundColor: '#00000030',
  },

  marginTop20: {
    marginTop: 20,
  },

  bouttonCreate: {
    width: '100%',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  bouttonCreate2: {
    width: '100%',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    backgroundColor: '#00000050',
  },

  pageTitle: {
    color: 'black',
    fontSize: wp('7%'),
    fontFamily: 'Jost-Medium',
  },

  form: {
    width: wp('90%'),
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  flex1: {
    flex: 1,
    backgroundColor: '#242424',
    opacity: 0.3,
  },

  errText: {
    fontSize: 12,
    color: '#B70000',
    marginTop: 5,
  },

  viewFormik: {
    height: heightPercentageToDP(64),
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: '#F6F6F6',
    borderColor: '#242424',
    borderWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 0,
    position: 'absolute',
    bottom: 0,
    //shadowOpacity: 0.8,
    //shadowColor:"#242424",
    //shadowOffset: {height: -15, width: 0},
    width: '100%',
    alignItems: 'center',
  },

  labelInput: {
    marginTop: 17,
    marginBottom: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label2: {
    color: 'black',
    marginBottom: 25,
    fontFamily: 'Jost-Medium',
    fontSize: 25,
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Jost-Medium',
    fontSize: 16,
  },
  Addlabel: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
    fontSize: 16,
  },
  private: {
    flexDirection: 'row',
    marginTop: 5,
    width: '100%',
    justifyContent: 'space-between',
  },
  forgottenPasswordLink: {
    fontSize: wp('3.5%'),
  },

  input: {
    borderWidth: 1,
    borderColor: 'rgba(36, 36, 36, 0.3)',
    borderStyle: 'solid',
    borderRadius: 4,
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    position: 'relative',
  },

  inputError: {
    borderWidth: 1,
    borderColor: '#B70000',
    borderStyle: 'solid',
    borderRadius: 4,
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    position: 'relative',
  },

  submitButton: {
    backgroundColor: 'black',
    color: 'white',
    paddingTop: 4,
    paddingBottom: 4,
  },

  noAccountTextView: {
    marginTop: 15,
  },

  noAccountText: {
    fontFamily: 'Jost-Regular',
  },

  joinUsLink: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: 'black',
    fontFamily: 'Jost-Regular',
  },
});

export default AddCollectionStyle;
