import * as React from 'react'
import { Typography } from '../../ui';

interface IWSDebugProps {
  socketUrl: string;
}

interface IWSDebugState {
  messageList: MessageEvent<string>['data'][]
  messageInputValue: string

  socket?: WebSocket
  error?: string
}

class WSDebug extends React.Component<IWSDebugProps, IWSDebugState> {
  constructor(props: IWSDebugProps) {
    super(props)


    this.state = {
      socket: undefined,
      messageInputValue: '',
      messageList: [],
    }
  }

  componentDidMount(): void {
    const { socketUrl } = this.props

    this.socketInitConnection(socketUrl)
  }

  socketInitConnection = (url: string) => {
    const socket = new WebSocket(url)

    this.setState({
      socket,
    })
  }


  componentDidUpdate(prevProps: Readonly<IWSDebugProps>, prevState: Readonly<IWSDebugState>, snapshot?: any): void {
    if (prevState.socket !== this.state.socket) {
      this.socketSetupHandlers()
    }
  }
  
  socketSetupHandlers = () => {
    const { socket } = this.state

    if (!socket) {
      throw new Error('Setting up events failed due to non-initialized WS instance.')
    }

    socket.addEventListener('open', (e) => {
      console.log('Open event: ', e)
    })

    socket.addEventListener('close', (e) => {
      console.log('Close event: ', e)
    })

    socket.addEventListener('error', (e) => {
      console.error('Error occured in socket connection: ', e)
    })

    socket.addEventListener('message', (e) => {
      console.log('On message event: ', e)
    })

    socket.addEventListener('message', this.socketOnMessageHandler)
  }

  messageListUpate = (message: string) => {
    const { messageList: oldList } = this.state

    this.setState({
      messageList: [...oldList, message]
    })
  }

  socketOnMessageHandler = (e: MessageEvent<string>) => {
    this.messageListUpate(`Server message: ${e.data}`)
  }

  // Cleanup on unmount
  componentWillUnmount(): void {
    const { socket } = this.state

    if (socket) {
      socket.removeEventListener('message', this.socketOnMessageHandler)

      socket.close()
    }
  }

  onMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      messageInputValue: e.target.value,

      // Resetting error
      error: undefined,
    })
  }

  onMessageFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate string
    const { messageInputValue, socket } = this.state
    let error

    switch (true) {
      case (!socket): {
        error = 'Socket is not yet initialized to send data'
        break
      }

      case (!messageInputValue): {
        error = 'Unable to send blank value'
        break
      }
    }
    
    if (error) {
      this.setState({
        error,
      })
      
      return
    }

    // Send message
    // ** If is needed for dumb TS to work
    if (socket) {
      this.messageListUpate(`Your message: ${messageInputValue}`)
      socket.send(messageInputValue)

      this.setState({
        messageInputValue: '',
      })
    }
  }

  render() {
    const { messageList, messageInputValue } = this.state
    const mappedMessages: JSX.Element[] = messageList.map((message, index) => (
      <Typography size="b1" key={index}>
        {message}
      </Typography>
    ))
    return (
      <div>
        <Typography size="h4">Debug info:</Typography>
        <hr/>
        <Typography size="h6">Type something to send a message</Typography>
        <form onSubmit={this.onMessageFormSubmit}>
          <input type="text" onChange={this.onMessageChange} value={messageInputValue} placeholder="Type what you want to send" />
          <button type="submit">Send</button>
        </form>
        <hr/>
        {mappedMessages}
      </div>
    )
  }
}

export default WSDebug
