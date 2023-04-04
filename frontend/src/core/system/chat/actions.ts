import * as TYPES from './types'

export const chatGetListRequest = () => ({
  type: TYPES.CHAT_GET_LIST_REQUEST,
})

export const chatGetRequest = (payload: TYPES.IChatGetRequestAction['payload']) => ({
  type: TYPES.CHAT_GET_REQUEST,
  payload,
})

export const chatCreateRequest = (payload: TYPES.IChatCreateRequestAction['payload']) => ({
  type: TYPES.CHAT_CREATE_REQUEST,
  payload,
})

export const chatSetList = (payload: TYPES.IChatSetListAction['payload']) => ({
  type: TYPES.CHAT_SET_LIST,
  payload,
})

export const chatSet = (payload: TYPES.IChatSetAction['payload']) => ({
  type: TYPES.CHAT_SET,
  payload,
})
