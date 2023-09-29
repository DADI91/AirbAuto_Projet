import {combineReducers} from "redux";
import AuthReducer from "./AuthReducer";
import AppReducer from "./AppReducer";
import {StoreState} from "../../types/redux";

const index = combineReducers<StoreState | any>({
  auth: AuthReducer,
  app: AppReducer,
});

export default index;
