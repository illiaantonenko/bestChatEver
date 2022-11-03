import { Action } from "redux";

/**
 * Interfaces
 */
export interface IUser {
  // Basic fields
  firstName: string;
  lastName: string;
  email: string;
}

export interface IFullUser extends IUser {
  // Fields after creation
  createdAt: string;
  _id: string;
}

export interface IUserState extends IFullUser, Pick<IUserTokenResponse, 'accessToken'> {
  isFetching: boolean;
}

export interface IUserCreateRequest extends IUser {
  password: string;
}

export interface IUserAuthoriseRequest extends Pick<IUser, 'email'> {
  password: string;
}

export interface IUserTokenResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 * Constants
 */

 export const USER_AUTH_REQUEST = 'USER:AUTH_REQUEST';
 export const USER_SIGNUP_REQUEST = 'USER:SIGNUP_REQUEST';
 
 export const USER_GET = 'USER:GET';
 export const USER_SET = 'USER:SET';
 export const USER_TOKEN_SET = 'USER:TOKEN_SET';
 export const USER_LOGOUT = 'USER:LOGOUT';

/**
 * Actions
 */

export interface IUserSignUpRequestAction extends Action<typeof USER_SIGNUP_REQUEST> {
  payload: IUserCreateRequest;
}

export interface IUserAuthRequestAction extends Action<typeof USER_AUTH_REQUEST> {
  payload: IUserAuthoriseRequest;
}

export interface IUserSetAction extends Action<typeof USER_SET> {
  payload: IFullUser;
}

export interface IUserTokenSetAction extends Action<typeof USER_TOKEN_SET> {
  payload: IUserTokenResponse;
}

export interface IUserGetAction extends Action<typeof USER_GET> {}

export interface IUserLogoutAction extends Action<typeof USER_LOGOUT> {}

/**
 * Global exported types
 */

export type UserActionTypes = IUserSignUpRequestAction | IUserAuthRequestAction | IUserSetAction | IUserTokenSetAction | IUserLogoutAction | IUserGetAction;
