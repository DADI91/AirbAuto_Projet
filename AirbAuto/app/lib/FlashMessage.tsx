/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {Text, Animated} from 'react-native';
import FlashMessageStyle from '../ressources/style/FlashMessageStyle';

const FlashMessage = (props: {message: string; duration; onHide}) => {
  const [visible, setVisible] = useState(true);
  const slideUpValue = useRef(new Animated.Value(-100)).current;
  const slideDownValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    slideUp();
    const timer = setTimeout(() => {
      slideDown();
      setTimeout(() => {
        setVisible(false);
        props.onHide();
      }, 500); // wait for the slide down animation to complete
    }, props.duration);
    return () => clearTimeout(timer);
  }, [props.duration, props.onHide]);

  const slideUp = () => {
    Animated.timing(slideUpValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideDownValue, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        FlashMessageStyle.container,
        {
          backgroundColor: '#121212',
          transform: [{translateY: slideUpValue}],
          zIndex: 10,
        },
      ]}>
      <Text style={FlashMessageStyle.text}>{props.message}</Text>
    </Animated.View>
  );
};

export default FlashMessage;
