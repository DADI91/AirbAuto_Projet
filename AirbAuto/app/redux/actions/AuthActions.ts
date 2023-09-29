//import * as Request from '../../networks/ApiRequest';
import * as ActionType from "./ActionTypes";

import ApiUrls from "../../networks/ApiUrls";






/*
export const doLogin = body => {
  return async dispatch => {
    try {
      dispatch({ type: ActionType.POST_LOGIN_REQUEST });
      const result = await Request.getRequestWithAuth(ApiUrls.POST_LOGIN, body);
      dispatch({ type: ActionType.POST_LOGIN_SUCCESS, payload: result });
      return result;
    } catch (error) {
      dispatch({
        type: ActionType.POST_LOGIN_FAILURE,
        payload: error,
      });
      throw error;
    }
  };
};

export const changeLoginData = body => {
  return async dispatch => {
    try {
      dispatch({ type: ActionType.POST_LOGIN_SUCCESS, payload: body });
      return body;
    } catch (error) {
      dispatch({
        type: ActionType.POST_LOGIN_FAILURE,
        payload: error,
      });
      throw error;
    }
  };
}


export const doLogout = () => {
  return async dispatch => {
    try {
      dispatch({ type: ActionType.DO_LOGOUT });
    } catch (error) {
      dispatch({
        type: ActionType.POST_LOGIN_FAILURE,
        payload: error,
      });
      throw error;
    }
  }
}

export const doRegister = body => {
  return async dispatch => {
    try {
      dispatch({ type: ActionType.POST_REGISTER_REQUEST });
      const result = await Request.postRequest(ApiUrls.POST_REGISTER, body);
      // const isLogin = await AsyncStorage.getItem(constants.IS_LOGIN);
      //   const user = await AsyncStorage.getItem(constants.USER);
      //   // console.log("islogin: ", isLogin)
      //   // console.log("user: ", user)
      //   if (!isLogin) {
      //       await AsyncStorage.setItem(constants.IS_LOGIN, true);
      //       await AsyncStorage.setItem(constants.USER, {})
      //   }
      console.log("res",body)
      return dispatch({
        type: ActionType.POST_REGISTER_SUCCESS,
        payload: result,
      });
    } catch (error) {
      dispatch({
        type: ActionType.POST_REGISTER_FAILURE,
        payload: error,
      });
      throw error;
    }
  };
};

export const getRegisterTags = () => {
  return async dispatch => {
    try {
      dispatch({ type: ActionType.GET_REGISTRATION_TAGS_REQUEST });
      const result = await Request.getRequest(ApiUrls.REGISTRATION_TAGS);
      // console.log("result ", result)
      return dispatch({
        type: ActionType.GET_REGISTRATION_TAGS_SUCCESS,
        payload: result,
      });
    } catch (error) {
      // console.log("error : ", error)
      dispatch({
        type: ActionType.GET_REGISTRATION_TAGS_FAILURE,
        payload: error,
      });
      throw error;
    }
  };
};

export const doForget = body => {
  return async dispatch => {
    try {
      dispatch({ type: ActionType.POST_REGISTER_REQUEST });
      const result = await Request.postRequest(ApiUrls.POST_LOST_PASSWORD, body);
      return dispatch({
        type: ActionType.POST_REGISTER_SUCCESS,
        payload: result,
      });
    } catch (error) {
      dispatch({
        type: ActionType.POST_REGISTER_FAILURE,
        payload: error,
      });
      throw error;
    }
  };
}

export const doReinitialiser = body => {
  return async dispatch => {
    try {
      dispatch({ type: ActionType.POST_REGISTER_REQUEST });
      const result = await Request.postRequest(ApiUrls.POST_LOST_PASSWORD_RESET, body);
      return dispatch({
        type: ActionType.POST_REGISTER_SUCCESS,
        payload: result,
      });
    } catch (error) {
      dispatch({
        type: ActionType.POST_REGISTER_FAILURE,
        payload: error,
      });
      throw error;
    }
  };
}

export const postUserData = (body, userData) => {
  return async dispatch => {
    try {
      dispatch({ type: ActionType.SET_USER_DATA_REQUEST });
      const result = await Request.postRequestWithAuth(
        ApiUrls.POST_USER_DATA,
        body,
        userData
      );
      dispatch({ type: ActionType.SET_USER_DATA_SUCCESS, payload: result });
      return result;
    } catch (error) {
      dispatch({
        type: ActionType.SET_USER_DATA_FAILURE,
        payload: error,
      });
      throw error;
    }
  };
};



*/