import * as React from 'react';

import { Props } from '../../../containers/main';
import { Typography } from '../../ui';
import { WSDebug } from '../../views';

class HomePage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): void {
    const { getChatList } = this.props;

    getChatList();
  }

  render() {
    const { user } = this.props

    return (
      <div>
        <Typography size="b1">
          Some random content
        </Typography>
        <Typography size="b2">
          Authorised user: {JSON.stringify(this.props.user)}
        </Typography>
        <WSDebug socketUrl="ws://localhost:5001" user={user} />
      </div>
    );
  }
};

export default HomePage;
