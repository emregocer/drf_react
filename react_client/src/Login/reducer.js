import { LOGIN_SUCCESS, TOKEN_REFRESH_SUCCESS } from './constants';

const initialState = {
  username: null,
  token: null,
  refreshToken: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { username, token, refreshToken } = action.payload;
      return {
        ...state,
        username,
        token,
        refreshToken,
      };
    }
    case TOKEN_REFRESH_SUCCESS: {
      const { token } = action.payload;
      return {
        ...state,
        token,
      };
    }
    // case LOGOUT_SUCCESS: handled in the rootReducer by resetting all state
    default:
      return state;
  }
};

export default reducer;
