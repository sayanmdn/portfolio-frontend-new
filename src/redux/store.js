import { createStore, combineReducers } from "redux";
import { cakeReducer, authReducer } from "./reducer";

const store = createStore(
  combineReducers({ cake: cakeReducer, auth: authReducer }),
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
