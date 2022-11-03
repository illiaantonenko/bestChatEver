import { takeLatest, put, call, StrictEffect, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { TYPES, ACTIONS } from '../../system/user';
import { User } from '../../../utils/api';
import { IAppState } from '../../store';
import { IResponseBody } from '../../../utils/controllers/api';

function* signIn(action: TYPES.IUserAuthRequestAction): Generator<StrictEffect, void, IResponseBody<TYPES.IUserTokenResponse>> {
  try {
    const data = yield call([User.signIn, User.signIn.json], { body: action.payload });

    if (data.ok) {
      yield put(ACTIONS.setToken(data.body));
    } else {
      throw new Error('Oooopsie, type guard needed');
    }

    yield put(ACTIONS.getUser());
  } catch (err) {
    console.error(err);
  }
}

function* signUp(action: TYPES.IUserSignUpRequestAction): Generator<StrictEffect, void, IResponseBody<TYPES.IUserTokenResponse>> {
  try {
    const data = yield call([User.signUp, User.signUp.json], { body: action.payload });

    if (data.ok) {
      yield put(ACTIONS.setToken(data.body))
    } else {
      throw new Error('Oooopsie, type guard needed');
    }
  } catch (error) {
    console.error(error)
  }
}

function* getCurrentUser(action: TYPES.IUserGetAction): Generator<StrictEffect, void, any> {
  try {
    const state: IAppState = yield select()
    const data: IResponseBody<TYPES.IFullUser> = yield call([User.getCurrentUser, User.getCurrentUser.json], { token: state.user.access_token })

    if (data.ok) {
      yield put(ACTIONS.setUser(data.body))
    } else {
      throw new Error('Oooopsie, type guard needed');
    }
  } catch (error) {
    console.error(error)
  }
}

export default function* userSaga() : SagaIterator {
  yield takeLatest(TYPES.USER_SIGNUP_REQUEST, signUp);
  yield takeLatest(TYPES.USER_AUTH_REQUEST, signIn);
  yield takeLatest(TYPES.USER_GET, getCurrentUser);
}