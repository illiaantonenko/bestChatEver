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

@WebSocketGateway(5001) //{ path: '/chat' }
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: ws.Server;

  constructor(private readonly logger: Logger) {
    // console.log(this.cons);
    logger.log(
      `${ChatGateway.name} opened on port 5001`,
      'WebSocketsController',
    );
  }

  public handleConnection(_client: Socket) {
    // _client.userId = 123;
    //todo: handle auth of user
    this.logger.log('Connected');
  }

  public handleDisconnect() {
    this.logger.log('Disconnected');
  }

  @SubscribeMessage('newMessage')
  onNewMessage(
    @MessageBody() body,
    // @ConnectedSocket() _client: Socket,
  ): WsResponse<any> {
    const event = 'newMessage';

    // console.log(_client.userId);
    console.log(body);

    this.server.clients.forEach((client: Socket) => {
      client.send(JSON.stringify(body));
    });
    return { event, data: body };
  }
}
