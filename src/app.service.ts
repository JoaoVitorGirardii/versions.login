import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CommandsAuth } from './const/commandsAuth.const';
import { CommandsUsuario } from './const/commandsUsuario.const';
import { AUTH_SERVICE, USUARIO_SERVICE } from './const/services.const';
import { AuthLoginDto, UserCreate } from './dto/request/authLogin.dto';
import { AuthLoginResponseDto, UserDto } from './dto/response/authLogin.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject(AUTH_SERVICE) private authClientProxy: ClientProxy,
    @Inject(USUARIO_SERVICE) private usuarioClientProxy: ClientProxy,
  ) {}

  async login(payload: AuthLoginDto): Promise<UserDto> {
    const response = await firstValueFrom<AuthLoginResponseDto>(
      this.authClientProxy.send({ command: CommandsAuth.LOGIN }, payload),
    );

    if (response.valid && response.user) {
      return response.user;
    }

    throw new UnauthorizedException(
      'Usuário não autorizado, verifique seus dados',
    );
  }

  async createUser(body: UserCreate): Promise<UserDto | void> {
    try {
      const userCreated = await firstValueFrom<UserDto>(
        this.usuarioClientProxy.send(
          { command: CommandsUsuario.USER_CREATE },
          body,
        ),
      );

      return userCreated;
    } catch (error) {
      console.error('Erro[createUser]: ', error);
      throw new InternalServerErrorException('Erro ao tentar criar o usuário.');
    }
  }
}
