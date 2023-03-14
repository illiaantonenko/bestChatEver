import * as React from 'react'
import { Typography } from '../../ui'
import { Props as ContainerProps } from '../../../containers/auth';

interface IProps {
  signIn: ContainerProps['signIn'],
}

interface IState {
  email: string;
  password: string;
}

class SignInView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      email: event.target.value,
    });
  }

  onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ password: event.target.value });
  }

  onSignInSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const { signIn } = this.props;
    const { email, password } = this.state;

    signIn({ email, password });
  }

  render() {
    const { email, password } = this.state;

    return (
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
    )
  }
}

export default SignInView;
