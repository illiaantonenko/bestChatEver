import * as TYPES from './types';

// Auth user
export const authUserRequest = (payload: TYPES.IUserAuthRequestAction['payload']) : TYPES.UserActionTypes => ({
  payload,
  type: TYPES.USER_AUTH_REQUEST,
});

export const signupUserRequest = (payload: TYPES.IUserSignUpRequestAction['payload']) : TYPES.UserActionTypes => ({
  payload,
  type: TYPES.USER_SIGNUP_REQUEST,
});

export const getUser = () : TYPES.UserActionTypes => ({
  type: TYPES.USER_GET,
})

export const setToken = (payload: TYPES.IUserTokenSetAction['payload']) : TYPES.UserActionTypes => ({
  payload,
  type: TYPES.USER_TOKEN_SET,
})

export const setUser = (payload: TYPES.IUserSetAction['payload']) : TYPES.UserActionTypes => ({
  payload,
  type: TYPES.USER_SET,
});

export const logOut = () :  TYPES.UserActionTypes => ({
  type: TYPES.USER_LOGOUT,
});
