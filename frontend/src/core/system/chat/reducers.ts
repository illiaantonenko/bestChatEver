import { Reducer } from 'redux'

import * as TYPES from './types'

const initialState: TYPES.IChatState = {
  _id: '',
  participantList: [],
  messageList: [],

  isHaveUnread: false,
  isFetching: false,
}

const initialListState: TYPES.IChatListState = {
  list: [],

  isFetching: false,
}

const reducer: Reducer<TYPES.IChatListState, TYPES.ChatActionTypes> = (
  state = initialListState,
  action,
): TYPES.IChatListState => {
  switch (action.type) {
    case TYPES.CHAT_GET_LIST_REQUEST: {
      return {
        ...state,
        isFetching: true,
      }
    }

    case TYPES.CHAT_GET_REQUEST: {
      const { _id } = action.payload
      const list = state.list.map(chat => {
        if (chat._id !== _id) return chat;

        return {
          ...chat,
          isFetching: true
        }
      })

      return {
        ...state,
        list,
      }
    }

    case TYPES.CHAT_CREATE_REQUEST: {
      return {
        ...state,
        isFetching: true,
      }
    }

    case TYPES.CHAT_SET_LIST: {
      const { list: oldList } = state
      const { chatList } = action.payload
      // Filter action payload 
      const list: TYPES.IChatState[] = chatList.map(chat => {
        let oldChat = oldList.find(oldChat => oldChat._id === chat._id)

        return {
          ...initialState,
          ...oldChat,
          ...chat,
        }
      })

      return {
        ...state,
        list,
        isFetching: false,
      }
    }

    case TYPES.CHAT_SET: {
      const { _id, messageList } = action.payload
      const list = state.list.map(chat => {
        if (chat._id !== _id) return chat

        // TODO: set isHaveUnread

        return {
          ...chat,
          messageList,
          isFetching: false,
        }
      })

      return {
        ...state,
        list,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
