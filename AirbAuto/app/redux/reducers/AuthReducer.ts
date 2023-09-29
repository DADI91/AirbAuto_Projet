import * as ActionType from "../actions/ActionTypes";
import { NativeModules, Platform } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";

///Penser a regler asyncstorage


// iOS:
let locale = Platform.OS === "ios" ? NativeModules.SettingsManager.settings.AppleLocale ||
  NativeModules.SettingsManager.settings.AppleLanguages[0] : NativeModules.I18nManager.localeIdentifier // "fr_FR"

AsyncStorage.getItem("currentLanguage").then(res => {
  if (res) {
    locale = res
  } else {
    AsyncStorage.setItem("currentLanguage", locale);
  }
})

export const initialState = {
  // handles languages
  currentLanguage: locale.substring(0, locale.substring(0, 2)),

};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
   
    default:
      return state;
  }
}
