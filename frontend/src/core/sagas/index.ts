import { all, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import UserSaga from './user';
import ChatSaga from './chat';

export default function* rootSaga() : SagaIterator {
  yield all([
    call(UserSaga),
    call(ChatSaga),
  ]);
};
