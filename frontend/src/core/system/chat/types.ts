import { Action } from "redux"

/**
 * Constants
 */

// get chatList
// create chat
// get chat
export const CHAT_GET_LIST_REQUEST = 'CHAT:GET_LIST:REQUEST'
export const CHAT_GET_REQUEST = 'CHAT:GET:REQUEST'
export const CHAT_CREATE_REQUEST = 'CHAT:CREATE:REQUEST'

export const CHAT_SET_LIST = 'CHAT:SET_LIST'
export const CHAT_SET = 'CHAT:SET'

/**
 * Interfaces
 */

export interface IChat {
  _id: string
  participantList: string[]
}

export interface IMessage {
  _id: string
  createdAt: string

  body: string
  author: string

  isRead: boolean
}

export interface IChatState extends IChat {
  isFetching: boolean
  isHaveUnread: boolean

  messageList: IMessage[]
}

export interface IChatListState {
  list: IChatState[]

  isFetching: boolean
}

/**
 * API interfaces
 */
export interface IChatGetListResponse {
  chatList: IChat[]
}

export interface IChatGetRequest {
  _id: string
}

export interface IChatGetResponse {
  messageList: IMessage[]
}

export interface IChatCreateRequest {
  participantList: string[]
}

export interface IChatCreateResponse extends IChat {}

/**
 * user1 => !chat.messages[0].isRead && .author !== user1.id => chat.isHaveUnread = true
 */

/**
 * Actions
 */

export interface IChatGetListRequestAction extends Action<typeof CHAT_GET_LIST_REQUEST> {}

export interface IChatGetRequestAction extends Action<typeof CHAT_GET_REQUEST> {
  payload: IChatGetRequest
}

export interface IChatCreateRequestAction extends Action<typeof CHAT_CREATE_REQUEST> {
  payload: IChatCreateRequest
}

export interface IChatSetListAction extends Action<typeof CHAT_SET_LIST> {
  payload: IChatGetListResponse
}

export interface IChatSetAction extends Action<typeof CHAT_SET> {
  payload: Pick<IChatState, '_id' | 'messageList'>
}

/**
 * Global exported types
 */

export type ChatActionTypes = IChatGetListRequestAction | IChatGetRequestAction | IChatCreateRequestAction | IChatSetListAction | IChatSetAction
