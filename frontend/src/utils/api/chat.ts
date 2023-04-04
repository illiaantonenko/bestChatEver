import API from '../controllers/api';

import { TYPES } from '../../core/system/chat'

const API_URL = process.env.REACT_APP_API_URL;

const Chat = {
  getChatList: new API<TYPES.IChatGetListResponse>(
    'GET',
    `${API_URL}/chat`,
    'application/json',
  ),

  getChat: new API<TYPES.IChatGetResponse>(
    'GET',
    `${API_URL}/chat/{_id}`,
    'application/json',
  ),

  postChat: new API<TYPES.IChatCreateResponse, TYPES.IChatCreateRequest>(
    'GET',
    `${API_URL}/user/profile`,
    'application/json',
  )
}

export default Chat;