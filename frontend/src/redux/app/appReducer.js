import {
  APP_ACTION_LOGIN,
  APP_ACTION_LOGOUT,
} from './action';

const initialState = {
  token: null,
  user: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case APP_ACTION_LOGIN:
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case APP_ACTION_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

