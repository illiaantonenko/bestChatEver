import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router';

import * as USER from '../../core/system/user';
import { IAppState } from '../../core/store';
import { AuthPage } from '../../components/pages';

interface IStateProps {
  user: USER.TYPES.IUser;
}

interface IDispatchProps {
  signIn: (payload: USER.TYPES.IUserAuthRequestAction['payload']) => void;
  signUp: (payload: USER.TYPES.IUserSignUpRequestAction['payload']) => void;
}

export type Props = IStateProps & IDispatchProps & RouteProps;

const mapStateToProps = (state: IAppState, ownProp: RouteProps) : IStateProps => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: RouteProps) : IDispatchProps => ({
  signIn: (payload) => {
    dispatch(USER.ACTIONS.authUserRequest(payload));
  },
  signUp: (payload) => {
    dispatch(USER.ACTIONS.signupUserRequest(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthPage);