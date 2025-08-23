import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthLoginDto } from './dto/request/authLogin.dto';
import { AuthLoginResponseDto, UserDto } from './dto/response/authLogin.dto';
import { Commands } from './enum/commands.enum';

@Injectable()
export class AppService {
  constructor(@Inject('AUTH_SERVICE') private clientProxy: ClientProxy) {}

  async login(payload: AuthLoginDto): Promise<UserDto> {
    console.log('chegou aqui no LOGIN: ', payload);

    const response = await firstValueFrom<AuthLoginResponseDto>(
      this.clientProxy.send({ command: Commands.USER_LOGIN }, payload),
    );

    console.log('response: ', response);

    if (response.valid && response.user) {
      return response.user;
    }

    throw new UnauthorizedException('Usuário não autorizado');
  }
}
