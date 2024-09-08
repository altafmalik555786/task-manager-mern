/* eslint-disable no-unreachable */
import { SET_USER_INFO } from "actions/auth/authAction";

const initialState = {
  userInfo: {},
};
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
}
