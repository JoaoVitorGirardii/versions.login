import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AUTH_SERVICE, USUARIO_SERVICE } from './const/services.const';

const AUTH_SERVICE_HOST = process.env.AUTH_SERVICE_HOST || '127.0.0.1';
const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT || 3001;

const USUARIO_SERVICE_HOST = process.env.USUARIO_SERVICE_HOST || '127.0.0.1';
const USUARIO_SERVICE_PORT = process.env.USUARIO_SERVICE_PORT || 3001;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: AUTH_SERVICE_HOST,
          port: AUTH_SERVICE_PORT as number,
        },
      },
      {
        name: USUARIO_SERVICE,
        transport: Transport.TCP,
        options: {
          host: USUARIO_SERVICE_HOST,
          port: USUARIO_SERVICE_PORT as number,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
