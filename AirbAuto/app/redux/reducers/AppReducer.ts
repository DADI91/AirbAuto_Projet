import * as ActionType from "../actions/ActionTypes";
import { NativeModules, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


// iOS:
const locale =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier; // "fr_FR"
const initialState = {
  // handles languages
  currentLanguage: locale.substring(0, 2),
  isBottomTabBarVisibre: false,
  userId: "",
  tokenUser: "",
  userName: "",
  connect: false,
  isModalVisible: false,
  initApp: false,
  pageAddContent: 0,
  videoUrl: "",
  UserCred: {username : "", password : ""}

};


export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case "RESET_STATE":
      return initialState;
    case ActionType.CHANGE_LANGUAGE:
      AsyncStorage.setItem("currentLanguage", action.payload);
      return {
        ...state,
        currentLanguage: action.payload,
      };
    case ActionType.UPDATE_IS_TAPBAR_VISIBLE:
      {console.log("je modifie")}
      return {
        
        ...state,
        isBottomTabBarVisibre: action.payload
      };
    case ActionType.UPDATE_USER_ID_CONNECT:
      return {
        ...state,
        userId: action.payload
      };
    case ActionType.CONNECT:
      return {
        ...state,
        connect: action.payload
      };
    case ActionType.UPDATE_TOKEN_USER:
      return {
        ...state,
        tokenUser: action.payload
      };
    case ActionType.UPDATE_USERNAME:
      return {
        ...state,
        userName: action.payload
      };
    case ActionType.UPDATE_IS_MODAL_VISIBLE:
      return {
        ...state,
        isModalVisible: action.payload
      };
    case ActionType.SET_VIDEO_URL:
      return { 
        ...state, 
        videoUrl: action.url 
      };
    case ActionType.UPDATE_PAGE:
      return {
        ...state,
        pageAddContent: action.payload
      };
    case ActionType.APPISINIT:
      return {
        ...state,
        initApp: action.payload,
      };
    case ActionType.USER_CRED:
      return {
        ...state,
        UserCred: action.payload,
      };
    default:
      return state;
  }
}
