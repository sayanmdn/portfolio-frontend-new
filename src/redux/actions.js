import { BUY_CAKE, SET_AUTH_USER, REMOVE_AUTH_USER } from "./actionTypes";

export const buyCake = () =>{
  return {
    type: BUY_CAKE
  }
}

export const initAuth = (userObj) => {
  return {
    type: SET_AUTH_USER,
    payload: userObj
  }
}

export const delAuth = () => {
  return {
    type: REMOVE_AUTH_USER,
  }
}
