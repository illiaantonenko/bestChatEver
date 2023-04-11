import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { TYPES, ACTIONS } from '../../system/chat';
import { Chat } from '../../../utils/api';
import { IAppState } from '../../store';
import { IResponseBody } from '../../../utils/controllers/api';

function* getChatList (action: TYPES.IChatGetListRequestAction) {
  try {
    const state: IAppState = yield select()
    const data: IResponseBody<TYPES.IChatGetListResponse> = yield call(Chat.getChatList.json, { token: state.user.accessToken })

    if (data.ok) {
      yield put(ACTIONS.chatSetList(data.body))
    } else {
      throw new Error('Oooopsie, type guard needed');
    }
  } catch (error) {
    console.error(error)
  }
}

function* getChat (action: TYPES.IChatGetRequestAction) {
  try {
    const { _id } = action.payload
    const state: IAppState = yield select()
    const data: IResponseBody<TYPES.IChatGetResponse> = yield call(Chat.getChat.json, { token: state.user.accessToken, query: { _id } })

    if (data.ok) {
      yield put(ACTIONS.chatSet({ _id, messageList: data.body.messageList }))
    } else {
      throw new Error('Oooopsie, type guard needed');
    }
  } catch (error) {
    console.error(error)
  }
}

function* postChat (action: TYPES.IChatCreateRequestAction) {
  try {
    const state: IAppState = yield select()
    const data: IResponseBody<TYPES.IChatCreateResponse> = yield call(Chat.postChat.json, { token: state.user.accessToken, body: action.payload })

    if (data.ok) {
      yield put(ACTIONS.chatSetList({ chatList: [ data.body ] }))
    } else {
      throw new Error('Oooopsie, type guard needed');
    }
  } catch (error) {
    console.error(error)
  }
}

export default function* chatSaga (): SagaIterator {
  yield takeLatest(TYPES.CHAT_GET_LIST_REQUEST, getChatList);
  yield takeLatest(TYPES.CHAT_GET_REQUEST, getChat);
  yield takeLatest(TYPES.CHAT_CREATE_REQUEST, postChat);
}
