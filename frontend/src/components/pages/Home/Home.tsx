import * as React from 'react';

import { Props } from '../../../containers/main';
import { Typography } from '../../ui';

class HomePage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Typography size="b1">
          Some random content
        </Typography>
        <Typography size="b2">
          Authorised user: {JSON.stringify(this.props.user)}
        </Typography>
      </div>
    );
  }
};

export default HomePage;
