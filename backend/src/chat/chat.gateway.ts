import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets/decorators';
import { Socket } from 'dgram';
import ws from 'ws';

@WebSocketGateway(5001)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: ws.Server;

  constructor(private readonly logger: Logger) {}
  public handleConnection() {
    this.logger.log('Connected');
  }

  public handleDisconnect() {
    this.logger.log('Disconnected');
  }

  @SubscribeMessage('newMessage')
  onNewMessage(
    @MessageBody() body,
    @ConnectedSocket() client: Socket,
  ): WsResponse<object> {
    const event = 'newMessage';
    const data = { message: 'server response' };
    console.log(body);
    client.emit('newMessage', { message: 'random responce' });
    return { event, data };
  }
}
