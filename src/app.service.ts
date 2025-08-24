import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CommandsAuth } from './const/commandsAuth.const';
import { CommandsUsuario } from './const/commandsUsuario.const';
import { AuthLoginDto, UserCreate } from './dto/request/authLogin.dto';
import { AuthLoginResponseDto, UserDto } from './dto/response/authLogin.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private authClientProxy: ClientProxy,
    @Inject('USUARIO_SERVICE') private usuarioClientProxy: ClientProxy,
  ) {}

  async login(payload: AuthLoginDto): Promise<UserDto> {
    const response = await firstValueFrom<AuthLoginResponseDto>(
      this.authClientProxy.send({ command: CommandsAuth.LOGIN }, payload),
    );

    if (response.valid && response.user) {
      return response.user;
    }

    throw new UnauthorizedException('Usuário não autorizado');
  }

  async createUser(body: UserCreate): Promise<UserDto | void> {
    const userCreated = await firstValueFrom<UserDto>(
      this.usuarioClientProxy.send(
        { command: CommandsUsuario.USER_CREATE },
        body,
      ),
    );

    return userCreated;
  }
}
