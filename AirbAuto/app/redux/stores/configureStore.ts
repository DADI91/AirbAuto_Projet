import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import index from "../reducers";
const middlewares = [];
middlewares.push(thunk);
if (process.env.NODE_ENV === "development") {
  //middlewares.push(logger);
}
export default function configureStore() {
  const store = compose(applyMiddleware(...middlewares))(createStore)(index);

  return store;
}
