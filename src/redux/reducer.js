import { BUY_CAKE, SET_AUTH_USER, REMOVE_AUTH_USER } from "./actionTypes";

const initialState = {
  numOfCakes: 10,
};

export const cakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const initialAuth = {
  user: null,
  isLoggedIn: false,
};

export const authReducer = (state = initialAuth, action) => {
  const { type, payload } = action;

  switch (type) {
    case BUY_CAKE:
      return {
        ...state,
        user: {},
      };
    case SET_AUTH_USER:
      return {
        user: payload,
        isLoggedIn: true
      };
    case REMOVE_AUTH_USER:
      return{
        isLoggedIn:false,
        user: null
      };
    default:
      return state;
  }
};
