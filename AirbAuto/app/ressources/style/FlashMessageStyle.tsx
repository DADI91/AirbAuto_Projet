import {StyleSheet} from 'react-native';

const FlashMessageStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 100,
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    justifyContent: 'flex-end',
  },
  text: {
    color: '#fff',
    width: '100%',
    fontWeight: 'bold',
  },
});

export default FlashMessageStyle;
