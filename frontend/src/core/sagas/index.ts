import { all, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import UserSaga from './user';

export default function* rootSaga() : SagaIterator {
  yield all([
    call(UserSaga),
  ]);
};
