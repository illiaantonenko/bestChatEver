import * as React from 'react';

import { Props } from '../../../containers/auth';
import SignIn from './SignIn';
import SignUp from './SignUp';

import * as css from './main.module.css';
import { Typography } from '../../ui';

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
    const { signIn, signUp, user } = this.props;

    return (
      <div>
        {/* Meta */}
        <div>
          <Typography size="b2">
            User state:
          </Typography>
          <Typography size="c2">
            {JSON.stringify(user)}
          </Typography>
        </div>
        {/* Sign In */}
        <SignIn onSubmit={signIn} />
        {/* Sign Up */}
        <SignUp onSubmit={signUp} />
        <div>
          
        </div>
      </div>
    );
  }
};

export default AuthPage;
