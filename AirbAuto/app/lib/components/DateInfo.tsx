/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import DateInfo from '../../ressources/style/DateInfoStyle';

import Svg, {Path} from 'react-native-svg';
import DatePicker from 'react-native-date-picker';

interface AddProductModalProps {
  currentLanguage;
  visible: boolean;
  onClose: () => void;
  setInfo;
  date;
  sale?;
  minimumDate2?;
  minimumDate3?;
}

type hashtag = Array<{
  name: string;
}>;

const AddInfoModal = ({
  currentLanguage,
  visible,
  onClose,
  setInfo,
  sale,
  date,
  minimumDate2,
  minimumDate3,
}: AddProductModalProps) => {
  const [opacity] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(400));
  const containerRef = useRef<View>(null);
  const [legende, setLegende] = useState('');
  const [hashtag, setHashtag] = useState('');

  const [universesList, setUniversesList] = useState<Array<any>>([]);
  const [universeSelected, setUniverseSelected] = useState<Array<any>>([]);

  const [hashtags, setHashtags] = useState<hashtag>([]);
  const [inputValue, setInputValue] = useState('');

  const handleOnRemoveHashtag = (hashtagToRemove: string) => {
    setHashtags(hashtags.filter(hashtag => hashtag.name !== hashtagToRemove));
  };

  const renderHashtags = () => {
    if (hashtags.length === 0) {
      return null;
    }
    return hashtags.map(hashtag => (
      <Pressable
        key={hashtag.name}
        onPress={() => handleOnRemoveHashtag(hashtag.name)}
        style={DateInfo.hastageView}>
        <Text style={DateInfo.hastageText}>{`#${hashtag.name}`}</Text>
        <Svg
          width={14}
          height={14}
          viewBox="0 0 25 24"
          fill="none"
          style={DateInfo.marginLeft}>
          <Path
            d="M6.074 18l12-12m-12 0l12 12"
            stroke="#F6F6F6"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Pressable>
    ));
  };

  const handleEndEditing = () => {
    if (inputValue) {
      const newHashtag = {name: inputValue.trim()};
      setHashtags([...hashtags, newHashtag]);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 0.3,
        duration: 0,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateY, {
        toValue: 400,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [opacity, translateY, visible]);

  const handleSubmitForm = useCallback(
    (values: {legende; hashtag; universesList}) => {
      setLegende(values.legende);
      setInfo({
        legend: values.legende,
        hastag: values.hashtag,
        univeres: values.universesList,
      });
      onClose();
    },
    [onClose, setInfo],
  );

  const maskKeyboard = () => {
    Keyboard.dismiss();
  };

  const currentDate = new Date();
  const minimumBirthDate = new Date();
  sale
    ? minimumBirthDate.setFullYear(currentDate.getFullYear())
    : minimumBirthDate.setFullYear(currentDate.getFullYear() - 18);
  console.log(minimumDate2);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity
        style={DateInfo.flex1}
        activeOpacity={1}
        onPress={() => {
          onClose();
        }}>
        <Animated.View style={[DateInfo.flex1, {opacity}]} />
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={maskKeyboard}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'position'}>
          <View style={{alignItems: 'center'}}>
            <View ref={containerRef} style={[DateInfo.viewFormik]} />
            <DatePicker
              date={date}
              onDateChange={newDate => setInfo(newDate)}
              mode="date"
              style={{marginBottom: 10}}
              textColor="black"
              maximumDate={
                !!minimumDate2 || !!minimumDate3 ? undefined : minimumBirthDate
              }
              minimumDate={minimumDate3}
            />

            <Pressable
              style={{
                backgroundColor: '#98351C',
                marginBottom: 50,
                width: '60%',
                height: 30,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                onClose();
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                }}>
                {'ok'}
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddInfoModal;
