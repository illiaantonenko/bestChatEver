import API from '../controllers/api';

import { TYPES } from '../../core/system/user'

const User = {
  signIn: new API<TYPES.IUserTokenResponse, TYPES.IUserAuthoriseRequest>(
    'POST',
    `${process.env.API_URL}/auth/login`,
    'application/json',
  ),

  signUp: new API<TYPES.IUserTokenResponse, TYPES.IUserCreateRequest>(
    'POST',
    `${process.env.API_URL}/auth/register`,
    'application/json',
  ),

  getCurrentUser: new API<TYPES.IUserSetAction['payload']>(
    'GET',
    `${process.env.API_URL}/user/profile`,
    'application/json',
  )
}

export default User;