import * as React from 'react';

import { Props } from '../../../containers/auth';
import { Typography } from '../../ui';
import { SignIn, SignUp, WSDebug } from '../../views'

import * as css from './main.module.css';

interface IState {
  email: string;
  password: string;
}

class AuthPage extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    // this.switchTabs = this.switchTabs.bind(this);
  }

  render() {
    const { user, signIn, signUp } = this.props;

    return (
      <div>
        <SignIn signIn={signIn} />
        <SignUp signUp={signUp} />
        <div>
          <Typography size="b2">
            User state:
          </Typography>
          <Typography size="c2">
            {JSON.stringify(user)}
          </Typography>
        </div>
        <WSDebug socketUrl="ws://localhost:5001" />
      </div>
    );
  }
};

export default AuthPage;
