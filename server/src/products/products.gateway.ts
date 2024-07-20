import { WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ProductsGateway {
  constructor(private readonly authService: AuthService) {}
  @WebSocketServer()
  private readonly server: Server;

  handleProductUpdated() {
    this.server.emit('productUpdated');
  }

  handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.Authentication.value;
      this.authService.verifyToken(token);
    } catch (error) {
      throw new WsException('Unauthorized');
    }
  }
}
