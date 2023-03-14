import * as React from 'react'
import { Typography } from '../../ui'
import { Props as ContainerProps } from '../../../containers/auth';

interface IProps {
  signUp: ContainerProps['signUp'],
}

interface IState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

class SignUpView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
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

  onFirstNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ firstName: event.target.value });
  }

  onLastNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ lastName: event.target.value });
  }

  onSignUpSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const { signUp } = this.props;
    const { email, password, firstName, lastName } = this.state;

    signUp({ email, password, firstName, lastName });
  }

  render() {
    const { email, password, firstName, lastName } = this.state;

    return (
      <div>
          <Typography size="b1">
            Sign in form
          </Typography>

          <form onSubmit={this.onSignUpSubmit}>
            <input name="email" type="text" onChange={this.onEmailChange} value={email} />
            <input name="password" type="password" onChange={this.onPasswordChange} value={password} />
            <input name="firstName" type="text" onChange={this.onFirstNameChange} value={firstName} />
            <input name="lastName" type="text" onChange={this.onLastNameChange} value={lastName} />
            <button type="submit">Submit</button>
          </form>
        </div>
    )
  }
}

export default SignUpView;
