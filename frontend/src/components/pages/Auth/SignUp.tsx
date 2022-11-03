import * as React from 'react'
import { Props } from '../../../containers/auth';
import { Typography } from '../../ui';

export interface ISignIUpProps {
  onSubmit: Props['signUp'],
}

interface ISignIUpState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

class SignIUp extends React.Component<ISignIUpProps, ISignIUpState> {
  constructor(props: ISignIUpProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  }

  onEmailChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ email: event.target.value })
  }

  onPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ password: event.target.value })
  }

  onFirstNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ firstName: event.target.value })
  }

  onLastNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({ lastName: event.target.value })
  }

  onSignIUpSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const { onSubmit } = this.props;
    const { email, password, firstName, lastName } = this.state;

    onSubmit({ firstName, lastName, email, password })
  }

  render() {
    const { email, password, firstName, lastName } = this.state;

    return (
      <div>
        <Typography size="b1">
          Sign in form
        </Typography>

        <form onSubmit={this.onSignIUpSubmit}>
          <input placeholder="email" name="email" type="text" onChange={this.onEmailChange} value={email} />
          <input placeholder="password" name="password" type="password" onChange={this.onPasswordChange} value={password} />
          <input placeholder="first name" name="firstName" type="text" onChange={this.onFirstNameChange} value={firstName} />
          <input placeholder="last name" name="lastName" type="text" onChange={this.onLastNameChange} value={lastName} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default SignIUp;
