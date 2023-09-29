import {InitialState as InitialAppState} from "../redux/reducers/AppReducer";
import {initialState as InitialAuthState} from "../redux/reducers/AuthReducer";

export type StoreState = {
    app: typeof InitialAppState,
    auth: typeof InitialAuthState
}
