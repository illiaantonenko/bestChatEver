import * as TYPES from './types';

const initialState : TYPES.IUserState = {
  accessToken: '',
  isFetching: false,
  createdAt: '',
  firstName: '',
  lastName: '',
  email: '',
  _id: '',
};

const reducer = (
  state: TYPES.IUserState = initialState,
  action: TYPES.UserActionTypes,
) : TYPES.IUserState => {
  switch (action.type) {
    // Set token action fired on form submission
    case TYPES.USER_TOKEN_SET: {
      const { accessToken } = action.payload;

      return {
        ...state,
        accessToken,
      }
    }

    // Auth, signup and get behaves similarly
    case TYPES.USER_GET:
    case TYPES.USER_AUTH_REQUEST:
    case TYPES.USER_SIGNUP_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };

    // User is set after identity approved
    } case TYPES.USER_SET: {
      return {
        ...state,
        ...action.payload,
        isFetching: false,
      };

    // Logout... is just logout -_-
    } case TYPES.USER_LOGOUT: {
      return {
        ...initialState,
        accessToken: '',
      };
    } default: return state;
  }
};

export default reducer;
