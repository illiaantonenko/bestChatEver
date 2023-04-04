import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router';

import * as USER from '../../core/system/user';
import * as CHAT from '../../core/system/chat';
import { IAppState } from '../../core/store';
import { HomePage } from '../../components/pages';

interface IStateProps {
  user: USER.TYPES.IUserState;
  chat: CHAT.TYPES.IChatListState;
}

interface IDispatchProps {
  logOut: () => void;

  getChatList: () => void;
}

export type Props = IStateProps & IDispatchProps & RouteProps;

const mapStateToProps = (state: IAppState, ownProp: RouteProps) : IStateProps => ({
  user: state.user,
  chat: state.chat,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: RouteProps) : IDispatchProps => ({
  logOut: () => {
    dispatch(USER.ACTIONS.logOut());
  },

  getChatList: () => {
    dispatch(CHAT.ACTIONS.chatGetListRequest())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);