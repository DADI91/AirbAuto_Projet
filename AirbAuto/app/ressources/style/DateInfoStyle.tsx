import {StyleSheet, Platform,} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const DateInfo = StyleSheet.create({
  form: {
    width: wp('90%'),
    display: 'flex',
    justifyContent: 'space-between',
  },

  marginLeft: {
    marginLeft: 2,
  },

  labelInput: {
    marginBottom: 17,
  },

  label: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Jost-Medium',
    fontSize: 16,
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

  labelInputs: {
    width: wp('90%'),
    marginBottom: 25,
  },

  labels: {
    color: '#F6F6F6',
    marginBottom: 10,
    fontFamily: 'Jost-Medium',
    fontSize: 16,
  },

  bouttonCreate: {
    width: '100%',
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
  },

  Addlabel: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
    fontSize: 16,
  },

  hastageView: {
    flexDirection: 'row',
    borderColor: '#121212',
    backgroundColor: '#121212',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  hastageText: {
    fontSize: 14,
    fontFamily: 'Jost-Regular',
    color: '#F6F6F6',

  },

  hastageTextInput: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hastageView2: {
    height: Platform.OS === 'ios' ? 40 : 60,
    borderWidth: 1,
    borderColor: 'rgba(36, 36, 36, 0.3)',
    borderRadius: 4,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hastageView2Err: {
    borderWidth: 1,
    borderColor: '#B70000',
    borderRadius: 4,
    padding: 8,
  },

  renderItemPressable: {
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },

  marginTop20: {
    marginTop: 20,
  },

  textErr: {
    fontSize: 12,
    color: '#B70000',
    marginTop: 5,
  },
  textErrHashtags: {
    fontSize: 12,
    color: '#B70000',
    marginTop: 5,
  },

  textInput: {
    flex: 1,
    color: '#121212',
  },
  flex1: {
    flex: 1,
  },

  viewFormik: {
    height:
      Platform.OS === 'ios'
        ? heightPercentageToDP(37.24)
        : heightPercentageToDP(60.24),
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
});

export default DateInfo;
