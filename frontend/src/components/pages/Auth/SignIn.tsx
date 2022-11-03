import * as React from 'react'
import { Props } from '../../../containers/auth';
import { Typography } from '../../ui';

export interface ISignInProps {
  onSubmit: Props['signIn'],
}

interface ISignInState {
  email: string;
  password: string;
}

class SignIn extends React.Component<ISignInProps, ISignInState> {
  constructor(props: ISignInProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ email: event.target.value })
  }

  onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ password: event.target.value })
  }

  onSignInSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const { onSubmit } = this.props;
    const { email, password } = this.state;

    onSubmit({ email, password })
  }

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <Typography size="b1">
          Sign in form
        </Typography>

        <form onSubmit={this.onSignInSubmit}>
          <input placeholder="email" name="email" type="text" onChange={this.onEmailChange} value={email} />
          <input placeholder="password" name="password" type="password" onChange={this.onPasswordChange} value={password} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default SignIn;
