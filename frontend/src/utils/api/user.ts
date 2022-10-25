import API from '../controllers/api';

import { TYPES } from '../../core/system/user'

const API_URL = process.env.REACT_APP_API_URL;

const User = {
  signIn: new API<TYPES.IUserTokenResponse, TYPES.IUserAuthoriseRequest>(
    'POST',
    `${API_URL}/auth/login`,
    'application/json',
  ),

  signUp: new API<TYPES.IUserTokenResponse, TYPES.IUserCreateRequest>(
    'POST',
    `${API_URL}/auth/register`,
    'application/json',
  ),

  getCurrentUser: new API<TYPES.IUserSetAction['payload']>(
    'GET',
    `${API_URL}/user/profile`,
    'application/json',
  )
}

export default User;