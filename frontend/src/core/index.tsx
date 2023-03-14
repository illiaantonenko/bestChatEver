import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { AuthContainer, HomeContainer } from '../containers';

import { store } from './store';

interface IState {
  auth: boolean;
  subscription: any;
}

class Application extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      auth: Boolean(store.getState().user.accessToken),
      subscription: null,
    };

    this.authHandler = this.authHandler.bind(this);
  }

  componentDidMount() {
    this.authHandler();
  }

  authHandler() {
    const subscription = store.subscribe(() => {
      const current = store.getState().user.accessToken;

      if (Boolean(current) !== this.state.auth) {
        this.setState({ auth: Boolean(current) });
      }
    });

    this.setState({
      subscription,
    });
  }

  componentWillUnmount() {
    this.state.subscription && this.state.subscription();
  }

  render() {
    const { auth } = this.state;

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            {!auth && (
              <>
                <Redirect to="/auth" />
                <Route exact path="/auth" component={AuthContainer} />
              </>
            )}

            <Route exact path="/home" component={HomeContainer} />

            <Redirect from="/" to="/home" />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
};

export default Application;