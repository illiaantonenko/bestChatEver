import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteProps } from 'react-router';

import * as USER from '../../core/system/user';
import { IAppState } from '../../core/store';
import { HomePage } from '../../components/pages';

interface IStateProps {
  user: USER.TYPES.IUser;
}

interface IDispatchProps {
  logOut: () => void;
}

export type Props = IStateProps & IDispatchProps & RouteProps;

const mapStateToProps = (state: IAppState, ownProp: RouteProps) : IStateProps => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: RouteProps) : IDispatchProps => ({
  logOut: () => {
    dispatch(USER.ACTIONS.logOut());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);