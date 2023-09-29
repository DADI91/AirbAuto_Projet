//import * as Request from '../../networks/ApiRequest';
import * as ActionType from './ActionTypes';
//import ApiUrls from "../../networks/ApiUrls";

//redux action with calls api using async and fetch

//Total 3 type of action
// 1 is request that handles loader
// 2 is success that pass response
// 3 is failure that pass errors
export const updateBottomTabBar = (isBottomTabBarVisibre: boolean) => {
  //console.log("c'est moi AppAction!",isModalVisible)
  console.log('updateBottomTabBar', isBottomTabBarVisibre);

  return async dispatch => {
    dispatch({
      type: ActionType.UPDATE_IS_TAPBAR_VISIBLE,
      payload: isBottomTabBarVisibre,
    });
    return isBottomTabBarVisibre;
  };
};
// actions.js
export const resetState = () => ({
  type: 'RESET_STATE',
});

export const setUserCred = (UserCred: {username: string; password: string}) => {
  //console.log("c'est moi AppAction!",isModalVisible)

  return async dispatch => {
    dispatch({
      type: ActionType.USER_CRED,
      payload: UserCred,
    });
    return UserCred;
  };
};

export const isConnect = (connect: boolean) => {
  //console.log("c'est moi AppAction!",isModalVisible)

  return async dispatch => {
    dispatch({
      type: ActionType.CONNECT,
      payload: connect,
    });
    return connect;
  };
};

export const updateUserIdConnect = userId => {
  //console.log("c'est moi AppAction!",isModalVisible)

  return async dispatch => {
    dispatch({
      type: ActionType.UPDATE_USER_ID_CONNECT,
      payload: userId,
    });
    return userId;
  };
};

export const updateToken = tokenUser => {
  //console.log("c'est moi AppAction!",isModalVisible)

  return async dispatch => {
    dispatch({
      type: ActionType.UPDATE_TOKEN_USER,
      payload: tokenUser,
    });
    return tokenUser;
  };
};
export const updateUsername = userName => {
  //console.log("c'est moi AppAction!",isModalVisible)

  return async dispatch => {
    dispatch({
      type: ActionType.UPDATE_USERNAME,
      payload: userName,
    });
    return userName;
  };
};

export const updatePage = (pageAddContent: number) => {
  //console.log("c'est moi AppAction!",pageAddContent)

  return async dispatch => {
    dispatch({
      type: ActionType.UPDATE_PAGE,
      payload: pageAddContent,
    });
  };
};

export const setVideoUrl = url => ({
  type: ActionType.SET_VIDEO_URL,
  url,
});

export const updateIsModalVisible = (isModalVisible: boolean) => {
  //console.log("c'est moi AppAction!",isModalVisible)

  return async dispatch => {
    dispatch({
      type: ActionType.UPDATE_IS_MODAL_VISIBLE,
      payload: isModalVisible,
    });
    return isModalVisible;
  };
};

export const AppInit = () => {
  return async dispatch => {
    dispatch({type: ActionType.APPISINIT, payload: true});
  };
};

export const getReetagsProductRefresh = isReetagsProductRefresh => {
  return {
    type: ActionType.GET_REETAGS_PRODUCT_REFRESH,
    payload: isReetagsProductRefresh,
  };
};

export const getProfileRefresh = isProfileRefresh => {
  return {
    type: ActionType.GET_USER_PROFILE_REFRESH,
    payload: isProfileRefresh,
  };
};
