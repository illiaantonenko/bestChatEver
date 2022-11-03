import * as React from 'react';

import { Props } from '../../../containers/auth';
import { Typography } from '../../ui';

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

  onEmailChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ email: event.target.value })
  }

  onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ password: event.target.value })
  }

  onSignInSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const { signIn } = this.props;
    const { email, password } = this.state;

    signIn({ email, password })
  }

  render() {
    const { user } = this.props;
    const { email, password } = this.state;

    return (
      <div>
        <div>
          <Typography size="b1">
            Sign in form
          </Typography>

          <form onSubmit={this.onSignInSubmit}>
            <input name="email" type="text" onChange={this.onEmailChange} value={email} />
            <input name="password" type="password" onChange={this.onPasswordChange} value={password} />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          <Typography size="b2">
            User state:
          </Typography>
          <Typography size="c2">
            {JSON.stringify(user)}
          </Typography>
        </div>
      </div>
    );
  }
};

export default AuthPage;
