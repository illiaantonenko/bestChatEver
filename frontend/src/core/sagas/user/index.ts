import { takeLatest, put, call, StrictEffect } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { TYPES, ACTIONS } from '../../system/user';
import { User } from '../../../utils/api';

function* signIn(this: any, action: TYPES.IUserAuthRequestAction): Generator<StrictEffect, void, TYPES.IUserTokenResponse> {
  try {
    const data = yield call(this, User.signIn.json, action.payload);

    yield put(ACTIONS.setToken(data));
  } catch (err) {
    console.error(err);
  }
}

function* signUp(this: any, action: TYPES.IUserSignUpRequestAction): Generator<StrictEffect, void, TYPES.IUserTokenResponse> {
  try {
    const data = yield call(this, User.signUp.json, action.payload);

    yield put(ACTIONS.setToken(data))
  } catch (error) {
    console.error(error)
  }
}

function* getCurrentUser(this: any, action: TYPES.IUserGetAction): Generator<StrictEffect, void, TYPES.IFullUser> {
  try {
    const data = yield call(this, User.getCurrentUser.json)

    yield put(ACTIONS.setUser(data))
  } catch (error) {
    console.error(error)
  }
}

export default function* userSaga() : SagaIterator {
  yield takeLatest(TYPES.USER_SIGNUP_REQUEST, signUp);
  yield takeLatest(TYPES.USER_AUTH_REQUEST, signIn);
  yield takeLatest(TYPES.USER_GET, getCurrentUser);
}